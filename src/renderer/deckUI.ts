import * as template from "../helpers/template";

export function createDeckEntries (args:any) {
    for (let deck of args) {
        const currli = document.querySelector(`.deckList li[deckid="${deck.id}"]`);
        if (currli) {
            currli.innerHTML = template.deckContent(deck.name, deck.numberRev, deck.numberNew);
        } else {
            let currli = document.createElement("li");
            currli.classList.add("appearFromTop");
            currli.setAttribute("deckid", deck.id);
            currli.innerHTML = template.deckContent(deck.name, deck.numberRev, deck.numberNew);
            document.querySelector(".deckList").appendChild(currli);
        }
    }
}