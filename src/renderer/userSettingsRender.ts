import * as request from "../helpers/request";

export function setSettingsPopup(settings:any) {
    const appearance = `<h2>Appearance</h2><span>Theme: </span><select class="themeSelect" onchange="listeners.changeTheme(this.value)"><option value="light">light</option><option value="dark">dark</option></select>`;
    (document.querySelector("#popupDetails") as HTMLElement).innerHTML = `${appearance}`;
    (document.querySelector(`.themeSelect option[value="${settings.appearance.theme}"]`) as HTMLElement).setAttribute("selected", "selected");
}