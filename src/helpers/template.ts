export function deckContent(deckName:string, deckFile:string, deckID:string, numberRev:string, numberNew:string) {
  return `<a class="gotoDeck" deckfile="${deckFile}">
    <span class="deckLabel">${deckName}</span>
    <div class="deckBtnList">
      <button class="deckEdit deckBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75-2.53 2.54 3.75 3.75 2.53-2.54z"/></svg></button>
      <button class="deckSettings deckBtn" onclick="callbackList.editDeck(this)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.44 12.99l-.01.02c.04-.33.08-.67.08-1.01 0-.34-.03-.66-.07-.99l.01.02 2.44-1.92-2.43-4.22-2.87 1.16.01.01c-.52-.4-1.09-.74-1.71-1h.01L14.44 2H9.57l-.44 3.07h.01c-.62.26-1.19.6-1.71 1l.01-.01-2.88-1.17-2.44 4.22 2.44 1.92.01-.02c-.04.33-.07.65-.07.99 0 .34.03.68.08 1.01l-.01-.02-2.1 1.65-.33.26 2.43 4.2 2.88-1.15-.02-.04c.53.41 1.1.75 1.73 1.01h-.03L9.58 22h4.85s.03-.18.06-.42l.38-2.65h-.01c.62-.26 1.2-.6 1.73-1.01l-.02.04 2.88 1.15 2.43-4.2s-.14-.12-.33-.26l-2.11-1.66zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg></button>
      <button class="deckDelete deckBtn" onclick="callbackList.deleteDeck(this)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 21h12V7H6v14zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg></button>
    </div>
    <div class="reviewCount">
      <span class="oldReview">${numberRev}</span>
      <span class="newReview">${numberNew}</span>
    </div>
  </a>`
}

export function popup(settingMap:object) {
  const popup = {
    setting: document.querySelector("#popupSetting"),
    content: document.querySelector("#popupContent")
  }
  popup.setting.innerHTML = "";
  popup.content.innerHTML = "";
  let first = true;
  for (let [setting, content] of Object.entries(settingMap)) {
    popup.setting.innerHTML += `<li value="${setting}" tabindex="0" ${first ? 'class="currLi"' : ""}>${setting}</li>`;
    popup.content.innerHTML += `<div settingid="${setting}" ${first ? 'class="display"' : ""}>${content}</div>`;
    first = false;
  }
  (popup.setting.querySelector("li:first-child") as HTMLElement).focus();
}

export const settingMap = {
  Appearance: '<h2>Appearance</h2><label>Theme: <select class="themeSelect" onchange="listeners.changeTheme(this.value); this.blur()" tabindex="0"><option value="light">Light</option><option value="dark">Dark</option></select></label>',
  "Deck Settings": `<h2>Deck Settings</h2><label>Default number of new cards per day: <input type="number" id="defaultNewCards" onchange="listeners.simpleSettingChange(['deckSettings', 'newCards'], parseInt(this.value))"></label><br><label>Default max cards per day: <input type="number" id="defaultMaxCards" onchange="listeners.simpleSettingChange(['deckSettings', 'maxCards'], parseInt(this.value))"></label>`
}

export function editDeckMap (target:any) {
  return {
    Main: `<h2>${target.name}</h2><label>Deck name: <input type="text" id="deckEditNameInput" value="${target.name}"></label><br><input id="useDefaultNewCards" type="checkbox" class="hider"><label for="useDefaultNewCards"> Use default number of new cards per day</label><br><label>New cards per day: <input type="text" id="newCardsPerDay"></label><br><input id="useDefaultMaxCards" type="checkbox" class="hider"><label for="useDefaultMaxCards"> Use default max number of cards per day</label><br><label>Max number of cards per day: <input type="text" id="newCardsPerDay"></label>`
  }
}

export const newDeck = {
  "New Deck": "<h2>Create New Deck</h2><label>Deck Name: <input type='text' id='newDeckName' tabindex='0'></label>",
  "Import Deck": '<div class="fileUploadWrapper necessary"><input type="file" multiple id="importDeckUpload" onchange="listeners.closePopup(); callbackList.handleFiles(Object.values(this.files))" tabindex="0"><h2>Import Deck</h2><p>To import .ktn deck files, just drag the file(s) and drop them in the window.<br>You can also click this window to look for the file.</p><p>KITANO is also compatible with Anki\'s .apkg files.<br>Note that exporting to .apkg is currently not doable.</p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="48px" height="48px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/></svg></div>',
  "New Folder": "<h2>Create New Folder</h2><label>Folder Name: <input type='text' id='newDeckName' tabindex='0'></label><br><label>Choose a deck to include in the folder: <select id='folderDeckSelect' tabindex='0'></select></label>"
}
