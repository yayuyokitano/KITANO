import * as themes from "../themes/themes";
import * as request from "../helpers/request";

export function changeTheme(newTheme:string) {
    simpleSettingChange(["appearance", "theme"], newTheme);
    for (let theme of Object.keys(themes)) {
        (themes as any)[theme].unuse();
    }
    (themes as any)[newTheme].use();
}

export function simpleSettingChange(property:string[], value:any) {
    request.sendRequest({ navInstruction: property, val: value }, "modifySetting", "null");
}