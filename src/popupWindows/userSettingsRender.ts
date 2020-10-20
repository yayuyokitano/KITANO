export function setSettingsPopup(settings:any) {
    (document.querySelector(`.themeSelect option[value="${settings.appearance.theme}"]`) as HTMLElement).setAttribute("selected", "selected");
    (document.querySelector("#defaultNewCards") as HTMLInputElement).value = settings.deckSettings.newCards;
    (document.querySelector("#defaultMaxCards") as HTMLInputElement).value = settings.deckSettings.maxCards;
}
