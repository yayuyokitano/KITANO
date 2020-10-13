import * as listenerList from "./mainListenerCall";

window.addEventListener("click", e => {
    //request.sendRequest({ navInstruction: ["appearance", "theme"], val: "light"}, "modifySetting");
    if ((e.target as HTMLElement).closest(".faded")) {
        listenerList.closePopup();
    }
})