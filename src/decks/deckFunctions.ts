import * as request from "../helpers/request";
import * as typeHandler from "./typeHandler";
import * as template from "../helpers/template";

export function prepareDeckEdit (settingList:any) {
    const settings = settingList[0];
    const globalSettings = settingList[1];
    if (settings.revPerDay === -1) {
        (document.querySelector("#maxCardsPerDay") as HTMLInputElement).value = globalSettings.maxCards;
        (document.querySelector("#useDefaultMaxCards") as HTMLInputElement).checked = true;
    } else {
        (document.querySelector("#maxCardsPerDay") as HTMLInputElement).value = settings.revPerDay;
    }

    if (settings.newPerDay === -1) {
        (document.querySelector("#newCardsPerDay") as HTMLInputElement).value = globalSettings.newCards;
        (document.querySelector("#useDefaultNewCards") as HTMLInputElement).checked = true;
    } else {
        (document.querySelector("#newCardsPerDay") as HTMLInputElement).value = settings.newPerDay;
    }
}

export function updateDeckSettings (target:HTMLInputElement, navInstruction:string[]) {

    const info = target.closest("#popupContent").querySelector("h2");
    const id = info.getAttribute("deckid");
    const path = info.getAttribute("deckfile");
    let value:number;
    
    if (target.type === "checkbox") {
        if (target.checked) {
            value = -1;
        } else {
            value = parseInt(target.nextElementSibling.nextElementSibling.querySelector("input").value);
        }
    } else {
        value = parseInt(target.value);
    }

    request.sendRequest({ path, id, navInstruction, value }, "modifyDeckSetting", "");
}

export function prepareCardEdit (deckData:any) {
    let table = "<table>";
    for (let card of deckData.cards) {
        table += template.deckTableRow(card, deckData.sortedNotes[card.nid], deckData.models);
    }
    document.querySelector("#strongPopup").innerHTML = table + "</table>";
    console.timeEnd("start");
}

export function prepareCard (deckData:any) {
    const index = 200; //will become argument
    let note = deckData.notes[index];
    const model = deckData.models[note.mid];
    let card = `<style>${model.css}</style>`;

    const noteFields = deckData.notes.map(e => e.flds.split("\u001f"));
    const fields = Object.fromEntries(model.flds.map((field, i) => [field.name, {...field, value: noteFields[index][i]}]));

    card += processFields(`<section class="questionSide">${model.tmpls[0].qfmt}</section>`, fields);
    card += processFields(`<section class="answerSide">${model.tmpls[0].afmt}</section>`, fields);
    console.log(card);
}

function processFields(card:string, fields:any) {
    let cardSplit = card.split("{{");
    let numberCondition = 0;
    let conditionObject = {};

    for (let [i, field] of cardSplit.entries()) {

        if (i === 0 && cardSplit[0]) {
            continue;
        }

        let fieldSplit = field.split("}}");
        field = fieldSplit.shift().replace(/{\\{/g, "{{").replace(/}\\}/g, "}}").trim();
        const fieldSuffix = fieldSplit.join("}}");

        //handle conditionals
        const fieldVar = field.slice(1);
        switch (field[0]) {
            case "#":
                if (!fields[fieldVar]?.value && !conditionObject[fieldVar]) {
                    conditionObject[fieldVar] = true;
                    numberCondition++;
                }
                cardSplit[i] = numberCondition === 0 ? fieldSuffix : "";
                continue;
            case "/":
                if (conditionObject[fieldVar]) {
                    conditionObject[fieldVar] = false;
                    numberCondition--;
                }
                cardSplit[i] = numberCondition === 0 ? fieldSuffix : "";
                continue;
        }

        //dont display if conditional bad
        if (numberCondition > 0) {
            cardSplit[i] = "";
            continue;
        }

        //exit if starts with colon, makes my life easier :)
        if (field[0] === ":") {
            cardSplit[i] = fields[field]?.value;
            continue;
        }

        let typeField = field.split(":");
        let type = "";
        if (typeField.length > 1) {
            type = typeField.shift();
        }
        
        field = typeField.filter(e => e !== "").join(":");
        
        if (typeHandler[type]) {
            console.log(field);
            field = typeHandler[type](fields[field]?.value);
        } else {
            field = fields[`${type}${type ? ":" : ""}${field}`]?.value;
        }

        cardSplit[i] = field + fieldSuffix;
    }
    return cardSplit.join("");
}
