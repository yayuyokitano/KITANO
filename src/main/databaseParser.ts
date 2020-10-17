import sqlite3 from "better-sqlite3";
import * as path from "path";
import { app } from "electron";
import * as main from "../index";
import { promises as fs } from "fs";

const decksPath = path.join(app.getPath("userData"), "decks");
fs.mkdir(decksPath);

export function getDeckData(deck:string) {
    const db = new sqlite3(path.join(decksPath, deck, "collection.anki2"));
    const notes = db.prepare("SELECT * FROM notes").all();
    /*for (let note of notes) {
        //console.log(note.flds.split("\u001f"));
    }*/

    const cards = db.prepare("SELECT * FROM cards").all();
    let usedDecks:any = new Set();
    for (let card of cards) {
        usedDecks.add(card.did);
    }
    usedDecks = Array.from(usedDecks);

    const col = db.prepare("SELECT * FROM col").get();
    const decks = JSON.parse(col.decks);

    let returnData = [];
    
    for (let usedDeck of usedDecks) {
        returnData.push({ name: decks[usedDeck].name, fileName: deck, id: decks[usedDeck].id, numberNew: 10, numberRev: 0});
    }

    main.sendData(returnData, "createDeckEntries");
}

export async function getAllDecks(args:any):Promise<null> {
    for (const file of await fs.readdir(decksPath)) {
        if ((await fs.stat(path.join(decksPath, file))).isDirectory()) {
            getDeckData(file);
        }
    }

    return null;
}