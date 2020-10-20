import * as request from "../helpers/request";

export function handleDeckSettings (settingList:any) {
    console.log(settingList);
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