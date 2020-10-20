import sqlite3 from "better-sqlite3";
import * as path from "path";
import { app } from "electron";
import * as main from "../index";
import * as fs from "fs";
import * as settings from "./userSettingsMain";

const decksPath = path.join(app.getPath("userData"), "decks");
fs.promises.mkdir(decksPath);

export async function getDeckData(deck:string) {
    const db = new sqlite3(path.join(decksPath, deck, "collection.anki2"));
    //const notes = db.prepare("SELECT * FROM notes").all();
    /*for (let note of notes) {
        //console.log(note.flds.split("\u001f"));
    }*/

    let { usedDecks, decks, dconf } = getDecks(db);

    let returnData = [];

    if (dconf === "KITANO") {
        //handle as KITANO deck
        for (let usedDeck of usedDecks) {
            const numberNew = getValueOrDefault(decks[usedDeck].settings.newPerDay, await settings.getSetting(["deckSettings", "newCards"]));
            returnData.push({ name: decks[usedDeck].name, fileName: deck, id: decks[usedDeck].id, numberNew, numberRev: 0});
        }
    } else {
        //migrate from anki format
        for (let usedDeck of usedDecks) {
            decks[usedDeck].settings = {};
            decks[usedDeck].settings.newPerDay = -1;
            decks[usedDeck].settings.revPerDay = -1;
            returnData.push({ name: decks[usedDeck].name, fileName: deck, id: decks[usedDeck].id, numberNew: await settings.getSetting(["deckSettings", "newCards"]), numberRev: 0});
        }
        db.prepare("UPDATE col SET decks = ?, dconf = ?").run(JSON.stringify(decks), JSON.stringify("KITANO"));
    }
    db.close();

    main.sendData(returnData, "createDeckEntries");
}

export async function getAllDecks(args:any):Promise<null> {
    for (const file of await fs.promises.readdir(decksPath)) {
        if ((await fs.promises.stat(path.join(decksPath, file))).isDirectory()) {
            getDeckData(file);
        }
    }

    return null;
}

function getValueOrDefault (val:any, def:any) {
    return ((val !== -1) ? val : def);
}

export function deleteDeck(args: any):null {
    const db = new sqlite3(path.join(decksPath, args.path, "collection.anki2"));
    
    let { usedDecks, decks, models } = getDecks(db);

    if (usedDecks.length === 1) {
        db.close();
        fs.rmdirSync(path.join(decksPath, args.path), { recursive: true });
    } else {
        usedDecks = usedDecks.filter(e => e !== args.id);

        db.prepare("DELETE FROM cards WHERE did = ?").run(args.id);
        const remaining:any = db.prepare("SELECT DISTINCT nid, id FROM cards").all();

        let remainingCards = [];
        let remainingNotes = [];
        for (let entry of remaining) {
            remainingNotes.push(entry.nid);
            remainingCards.push(entry.id);
        }

        db.prepare(`DELETE FROM notes WHERE id NOT IN (?${",?".repeat(remainingNotes.length - 1)})`).run(...remainingNotes);
        db.prepare(`DELETE FROM revlog WHERE cid NOT IN (?${",?".repeat(remainingCards.length - 1)})`).run(...remainingCards);

        let remainingModels = db.prepare("SELECT DISTINCT mid FROM notes").all();
        remainingModels = remainingModels.map(e => e.mid);
        
        let newModels = {};
        for (let [key, value] of Object.entries(models)) {
            if(remainingModels.includes((value as any).id)) {
                newModels[key] = value;
            }
        }

        let newDecks = {};
        for (let [key, value] of Object.entries(decks as object)) {
            if (value.id !== args.id) {
                newDecks[key] = value;
            }
        }

        db.prepare("UPDATE col SET decks = ?, models = ?").run(JSON.stringify(newDecks), JSON.stringify(newModels));
        db.prepare("VACUUM").run();
        db.close();

        //let worker = new Worker("removeUnusedMediaFiles");

        removeUnusedMediaFiles(path.join(decksPath, args.path));
    }
    return null;
}

function getDecks(db:any) {
    const cards = db.prepare("SELECT did FROM cards").all();

    let usedDecks:any = new Set();
    for (let card of cards) {
        usedDecks.add(card.did);
    }
    usedDecks = Array.from(usedDecks);

    const col = db.prepare("SELECT decks, models, dconf FROM col").get();
    return {
        usedDecks,
        decks: JSON.parse(col.decks),
        models: JSON.parse(col.models),
        dconf: JSON.parse(col.dconf)
    }
}


async function removeUnusedMediaFiles(deckPath:string) {
    const collection = (await fs.promises.readFile(path.join(deckPath, "collection.anki2"))).toString();
    const media = JSON.parse((await fs.promises.readFile(path.join(deckPath, "media"))).toString());
    
    let newMedia:any = {
        count: media.count,
        media: {}
    }
    
    for (let [mediaFile, index] of Object.entries(media.media)) {
        if (collection.indexOf(mediaFile) === -1) {
            await fs.promises.unlink(path.join(deckPath, index.toString()));
        } else {
            newMedia.media[mediaFile] = index;
        }
    }
    
    fs.promises.writeFile(path.join(deckPath, "media"), JSON.stringify(newMedia));
}

function getDeckSettings(target:any) {
    const db = new sqlite3(path.join(decksPath, target.path, "collection.anki2"));
    const decks = JSON.parse(db.prepare("SELECT decks FROM col").get().decks);
    return decks[target.id].settings;
}
