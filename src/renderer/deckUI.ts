import * as template from "../helpers/template";
import * as confirmation from "./confirmation";
import * as request from "../helpers/request";

export function createDeckEntries (args:any) {
    for (let deck of args) {
        const currli = document.querySelector(`.deckList li[deckid="${deck.id}"]`);
        if (currli) {
            currli.innerHTML = template.deckContent(deck.name.split("::").slice(-1).join(), deck.fileName, deck.id, deck.numberRev, deck.numberNew);
        } else {
            let parElement = document.querySelector(".deckList");
            const deckSplit = deck.name.split("::");

            if (deckSplit.length > 1) {
                let folderList = "";
                for (let folder of deckSplit.slice(0, -1)) {

                    if (parElement.tagName === "LI" && parElement.childElementCount === 1) {
                        let newList = document.createElement("ul");
                        parElement.appendChild(newList);
                    }
                    parElement = parElement.querySelector("ul") || parElement;

                    const currFolder = folderList + folder;
                    let currElement:HTMLElement = document.querySelector(`.deckList li[foldername="${currFolder}"]`)
                    folderList += `${folder}::`;

                    if (!currElement) {
                        //sorry
                        currElement = document.createElement("li");
                        currElement.classList.add("appearFromTop");
                        currElement.classList.add("folderElement");
                        currElement.setAttribute("foldername", currFolder);
                        let newLabel = document.createElement("span");
                        newLabel.classList.add("deckLabel");
                        newLabel.innerText = folder;
                        currElement.appendChild(newLabel);
                        parElement.appendChild(currElement);
                    }

                    parElement = currElement;
                }
            }

            if (parElement.tagName === "LI" && parElement.childElementCount === 1) {
                let newList = document.createElement("ul");
                parElement.appendChild(newList);
            }

            if (!parElement.classList.contains("deckList")) {
                parElement = parElement.querySelector("ul") || parElement;
            }

            let currli = document.createElement("li");
            currli.tabIndex = 0;
            currli.classList.add("appearFromTop");
            currli.setAttribute("deckid", deck.id);
            currli.innerHTML = template.deckContent(deckSplit.slice(-1).join(), deck.fileName, deck.id, deck.numberRev, deck.numberNew);
            parElement.appendChild(currli);
        }
    }
}

export async function deleteDeck(targetElement:HTMLElement) {
    const currli = targetElement.closest("li");
    const target = {
        path: targetElement.closest(".gotoDeck").getAttribute("deckfile"),
        name: (targetElement.closest(".gotoDeck").querySelector(".deckLabel") as HTMLElement).innerText,
        id: currli.getAttribute("deckid")
    }
    if (await confirmation.ask(`Do you want to delete ${target.name}?`)) {
        request.sendRequest(target, "deleteDeck", "");
        const shuli = getParentLi(currli);
        shuli.parentElement.removeChild(shuli);
    }
}

function getParentLi(currli:HTMLElement):HTMLElement {
    const shuli = currli.parentElement;
    if (((shuli.tagName === "LI" || (shuli.tagName === "UL" && !shuli.classList.contains("deckList"))) && shuli.childElementCount === 1) || shuli.classList.contains("folderElement")) {
        return getParentLi(shuli);
    }
    return currli;
}
