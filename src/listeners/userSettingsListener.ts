import * as listenerList from "./mainListenerCall";

window.addEventListener("click", e => {
    console.log(e.target);
    if ((e.target as HTMLElement).closest(".faded")) {
        listenerList.closePopup();
    }
})

window.addEventListener("keydown", e => {
    if (e.key === "Escape" && document.querySelector(".faded")) {
        listenerList.closePopup();
    }
})