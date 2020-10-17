export function setSettingsPopup(settings:any) {
    (document.querySelector(`.themeSelect option[value="${settings.appearance.theme}"]`) as HTMLElement).setAttribute("selected", "selected");
}