import * as request from "../helpers/request";
import * as themes from "../themes/themes";

export async function openSettings(targetElement:HTMLElement) {
    if (openPopup(targetElement) === "success") {
        (document.querySelector("#popupHeadline") as HTMLElement).innerText = "Settings";
        request.sendRequest([], "getSetting", "setSettingsPopup");
    }
}

export function closePopup() {
    document.querySelectorAll(".faded button").forEach( e => {
        (e as HTMLElement).tabIndex = 0;
    })
    document.querySelector("#popupDiv").classList.add("hidden");
    document.querySelector("#backgroundDiv").classList.remove("faded");
}

function openPopup(targetElement:HTMLElement):null|string {
    if (targetElement.closest(".faded")) {
        return null;
    }
    setTimeout(() => {
        document.querySelector("#popupDiv").classList.remove("hidden");
        document.querySelector("#backgroundDiv").classList.add("faded");
        document.querySelectorAll(".faded button").forEach( e => {
            (e as HTMLElement).tabIndex = -1;
        })
    })
    return "success";
}

export function changeTheme(newTheme:string) {
    request.sendRequest({ navInstruction: ["appearance", "theme"], val: newTheme }, "modifySetting", "null");
    for (let theme of Object.keys(themes)) {
        (themes as any)[theme].unuse();
    }
    (themes as any)[newTheme].use();
}