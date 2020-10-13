import * as themes from "../themes/themes";
import * as request from "../helpers/request";

request.sendRequest([], "getSetting", "initializeSettings");

export function initializeSettings(settings:any) {
    //theme
    (themes as any)[settings.appearance.theme].use();
}