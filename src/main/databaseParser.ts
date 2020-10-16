import sqlite3 from "better-sqlite3";
import * as path from "path";
import { app } from "electron";
import * as main from "../index";

const configPath = path.join(app.getPath("userData"), "decks");

export function getDeckData(deck:string) {
    console.log(deck);
    const db = new sqlite3(path.join(configPath, deck, "collection.anki2"));
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
        returnData.push({ name: decks[usedDeck].name, numberNew: 10, numberRev: 0});
    }

    main.sendData(returnData, "createDeckEntries");
}