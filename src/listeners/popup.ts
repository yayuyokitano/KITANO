import * as request from "../helpers/request";
import * as themes from "../themes/themes";
import * as template from "../helpers/template";

export async function openSettings(targetElement:HTMLElement) {
    openMainPopup(targetElement, template.settingMap);
    request.sendRequest([], "getSetting", "setSettingsPopup");
}

export async function openImport(targetElement:HTMLElement) {
    openMainPopup(targetElement, template.newDeck);
}

function openMainPopup(targetElement:HTMLElement, settingMap:object):null|string {
    if (targetElement.closest(".faded")) {
        return null;
    }

    template.popup(settingMap);

    openPopup("#popupDiv");
}

export function changeTheme(newTheme:string) {
    request.sendRequest({ navInstruction: ["appearance", "theme"], val: newTheme }, "modifySetting", "null");
    for (let theme of Object.keys(themes)) {
        (themes as any)[theme].unuse();
    }
    (themes as any)[newTheme].use();
}

export function openPopup(popupSelector:string) {
    setTimeout(() => {
        document.querySelector(popupSelector).classList.remove("hidden");
        document.querySelector("#backgroundDiv").classList.add("faded");
        document.querySelectorAll('.faded [tabindex]:not([tabindex="-1"]), .faded button').forEach( e => {
            (e as HTMLInputElement).tabIndex = -1;
            (e as HTMLInputElement).classList.add("disabledBtn");
        })
    })
}

export function closePopup(popupSelector:string) {
    document.querySelector(popupSelector).classList.add("hidden");
    document.querySelectorAll('.faded *[tabindex="-1"], .faded button').forEach( e => {
        (e as HTMLInputElement).tabIndex = 0;
        (e as HTMLInputElement).classList.remove("disabledBtn");
    })
    document.querySelector("#backgroundDiv").classList.remove("faded");
}

export function closeWeakPopup(popupSelector:string) {
    if (document.querySelector(popupSelector).getAttribute("isweak")) {
        closePopup(popupSelector);
    }
}
