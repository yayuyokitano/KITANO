import * as template from "../helpers/template";

export function createDeckEntries (args:any) {
    for (let deck of args) {
        document.querySelector(".deckList").innerHTML += template.deckItem(deck.name, deck.numberNew, deck.numberRev);
    }
}