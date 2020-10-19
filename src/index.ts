import { app, ipcMain, BrowserWindow } from 'electron';
import * as callbackList from "./main/functions";
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let mainWindow:BrowserWindow;

console.log(process.platform);

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      sandbox: true
    }
  });

  mainWindow.setMenuBarVisibility(false);

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  ipcMain.on("request", (IpcMainEvent, args) => {
    const returnValue = (callbackList as any)[args.data.fn](args.data.val);

    Promise.resolve(returnValue).then(returnVal => {
      if (returnVal !== null) {
        mainWindow.webContents.send("response", {
          callback: args.data.callback,
          val: returnVal
        });
      }
    })
    
  });
};

export function sendData(val:any, callback:string) {
  mainWindow.webContents.send("response", {
    callback: callback,
    val: val
  });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

process.on('uncaughtException', e => {
  console.error(e);
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
