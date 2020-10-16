import * as themes from "../themes/themes";
import * as request from "../helpers/request";

request.sendRequest([], "getSetting", "initializeSettings");
request.sendRequest([], "getAllDecks", "");

export function initializeSettings(settings:any) {
    //theme
    (themes as any)[settings.appearance.theme].use();
}