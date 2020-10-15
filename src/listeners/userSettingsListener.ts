import * as listenerList from "./mainListenerCall";

window.addEventListener("click", e => {
    if ((e.target as HTMLElement).closest(".faded")) {
        listenerList.closePopup();
    }
    
    (e.target as HTMLElement).closest("button")?.blur();
})

window.addEventListener("keydown", e => {
    if (e.key === "Escape" && document.querySelector(".faded")) {
        listenerList.closePopup();
    }
})