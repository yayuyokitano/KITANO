import * as request from "../helpers/request";
import * as themes from "../themes/themes";
import * as template from "../helpers/template";

export async function openSettings(targetElement:HTMLElement) {
    openPopup(targetElement, template.settingMap);
    request.sendRequest([], "getSetting", "setSettingsPopup");
}

export async function openImport(targetElement:HTMLElement) {
    openPopup(targetElement, template.newDeck);
}

export function closePopup() {
    document.querySelectorAll(".faded button").forEach( e => {
        (e as HTMLInputElement).tabIndex = 0;
        (e as HTMLInputElement).classList.remove("disabledBtn");
    })
    document.querySelector("#popupDiv").classList.add("hidden");
    document.querySelector("#backgroundDiv").classList.remove("faded");
}

function openPopup(targetElement:HTMLElement, settingMap:object):null|string {
    if (targetElement.closest(".faded")) {
        return null;
    }

    template.popup(settingMap);

    setTimeout(() => {
        document.querySelector("#popupDiv").classList.remove("hidden");
        document.querySelector("#backgroundDiv").classList.add("faded");
        document.querySelectorAll(".faded button").forEach( e => {
            (e as HTMLInputElement).tabIndex = -1;
            (e as HTMLInputElement).classList.add("disabledBtn");
        })
    })
}

export function changeTheme(newTheme:string) {
    request.sendRequest({ navInstruction: ["appearance", "theme"], val: newTheme }, "modifySetting", "null");
    for (let theme of Object.keys(themes)) {
        (themes as any)[theme].unuse();
    }
    (themes as any)[newTheme].use();
}