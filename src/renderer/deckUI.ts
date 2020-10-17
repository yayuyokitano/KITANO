import * as template from "../helpers/template";

export function createDeckEntries (args:any) {
    for (let deck of args) {
        const currli = document.querySelector(`.deckList li[deckid="${deck.id}"]`);
        if (currli) {
            currli.innerHTML = template.deckContent(deck.name, deck.fileName, deck.id, deck.numberRev, deck.numberNew);
        } else {
            let parElement = document.querySelector(".deckList");
            const deckSplit = deck.name.split("::");

            if (deckSplit.length > 1) {
                let folderList = "";
                for (let folder of deckSplit.slice(0, -1)) {
                    const currFolder = folderList + folder;
                    const currElement = document.querySelector(`.deckList li[foldername="${currFolder}"]`)
                    folderList += `${folder}::`;

                    if (!currElement) {
                        let currElement = document.createElement("li");
                        currElement.classList.add("appearFromTop");
                        currElement.setAttribute("foldername", currFolder);
                        parElement.appendChild(currElement);
                    }

                    parElement = currElement;
                }
            }

            let currli = document.createElement("li");
            currli.classList.add("appearFromTop");
            currli.setAttribute("deckid", deck.id);
            currli.innerHTML = template.deckContent(deckSplit.slice(-1).join(), deck.fileName, deck.id, deck.numberRev, deck.numberNew);
            parElement.appendChild(currli);
        }
    }
}

function deleteDeck() {
    
}