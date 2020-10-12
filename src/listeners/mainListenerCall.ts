import * as request from "../helpers/request";

export async function openSettings(targetElement:HTMLElement) {
    if (openPopup(targetElement) === "success") {
        (document.querySelector("#popupHeadline") as HTMLElement).innerText = "Settings";
        request.sendRequest([], "getSetting", "setSettingsPopup");
    }
}

export function closePopup() {
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
    })
    return "success";
}

export function changeTheme(theme:string) {
    request.sendRequest({ navInstruction: ["appearance", "theme"], val: theme }, "modifySetting", "null");
}