import * as request from "../helpers/request";

window.addEventListener("click", () => {
    request.sendRequest({ navInstruction: ["appearance", "theme"], val: "light"}, "modifySetting");
})