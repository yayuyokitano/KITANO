import * as request from "../helpers/request";
import * as template from "../helpers/template";

export function openSettings(targetElement:HTMLElement) {
    openMainPopup(targetElement, template.settingMap);
    request.sendRequest([], "getSetting", "setSettingsPopup");
}

export function openImport(targetElement:HTMLElement) {
    openMainPopup(targetElement, template.newDeck);
}

export function openDeckEdit(target:any) {
    openMainPopup(target.li, template.editDeckMap(target));
    //request.sendRequest(target, "getDeckSetting", "setDeckSettingsPopup");
}

function openMainPopup(targetElement:HTMLElement, settingMap:object):null|string {
    if (targetElement.closest(".faded")) {
        return null;
    }

    template.popup(settingMap);

    openPopup("#popupDiv");
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
