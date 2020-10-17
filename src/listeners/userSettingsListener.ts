import * as listenerList from "./mainListenerCall";

window.addEventListener("click", e => {
    if ((e.target as HTMLElement).closest(".faded")) {
        listenerList.closePopup();
    }
    
    const currli = (e.target as HTMLElement).closest("#popupSetting li") as HTMLElement;
    const currMenu = currli?.innerText;

    (e.target as HTMLElement).closest("button")?.blur();
    currli?.blur();
    if (currMenu) {
        document.querySelector("#popupContent .display").classList.remove("display");
        document.querySelector(`#popupContent div[settingid="${currMenu}"]`).classList.add("display");

        document.querySelector("#popupSetting .currLi").classList.remove("currLi");
        document.querySelector(`#popupSetting li[value="${currMenu}"]`).classList.add("currLi");
    }


})

window.addEventListener("keydown", e => {
    if (e.key === "Escape" && document.querySelector(".faded")) {
        listenerList.closePopup();
    }
})
