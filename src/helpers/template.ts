export function deckContent(deckName:string, deckFile:string, deckID:string, numberRev:string, numberNew:string) {
  return `<a class="gotoDeck" deckfile="${deckFile}">
    <span class="deckLabel">${deckName}</span>
    <div class="deckBtnList">
      <button class="deckEdit deckBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75-2.53 2.54 3.75 3.75 2.53-2.54z"/></svg></button>
      <button class="deckSettings deckBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.44 12.99l-.01.02c.04-.33.08-.67.08-1.01 0-.34-.03-.66-.07-.99l.01.02 2.44-1.92-2.43-4.22-2.87 1.16.01.01c-.52-.4-1.09-.74-1.71-1h.01L14.44 2H9.57l-.44 3.07h.01c-.62.26-1.19.6-1.71 1l.01-.01-2.88-1.17-2.44 4.22 2.44 1.92.01-.02c-.04.33-.07.65-.07.99 0 .34.03.68.08 1.01l-.01-.02-2.1 1.65-.33.26 2.43 4.2 2.88-1.15-.02-.04c.53.41 1.1.75 1.73 1.01h-.03L9.58 22h4.85s.03-.18.06-.42l.38-2.65h-.01c.62-.26 1.2-.6 1.73-1.01l-.02.04 2.88 1.15 2.43-4.2s-.14-.12-.33-.26l-2.11-1.66zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg></button>
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
    popup.setting.innerHTML += `<li value="${setting}" tabindex="10" ${first ? 'class="currLi"' : ""}>${setting}</li>`;
    popup.content.innerHTML += `<div settingid="${setting}" ${first ? 'class="display"' : ""}>${content}</div>`;
    first = false;
  }
  (popup.setting.querySelector("li:first-child") as HTMLElement).focus();
}

export const settingMap = {
  Appearance: `<h2>Appearance</h2><label>Theme: <select class="themeSelect" onchange="listeners.changeTheme(this.value); this.blur()" tabindex="10"><option value="light">Light</option><option value="dark">Dark</option></select></label>`
}

export const newDeck = {
  "New Deck": "<h2>Create New Deck</h2><label>Deck Name: <input type='text' id='newDeckName' tabindex='5'></label>",
  "Import Deck": "<input type='file' multiple id='importDeckUpload' onchange='listeners.closePopup(); callbackList.handleFiles(Object.values(this.files))' tabindex='5'><h2>Import Deck</h2><p>To import .ktn deck files, just drag the file(s) and drop them in the window.<br>You can also click this window to look for the file.</p><p>KITANO is also compatible with Anki's .apkg files.<br>Note that exporting to .apkg is currently not doable.</p>",
  "New Folder": "<h2>Create New Folder</h2><label>Folder Name: <input type='text' id='newDeckName' tabindex='5'></label><br><label>Choose a deck to include in the folder: <select id='folderDeckSelect' tabindex='5'></select></label>"
}
