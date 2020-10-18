import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("mainApi", {
  request: (data:any) => ipcRenderer.send("request", {
    data,
  }),
  onResponse: (fn:any) => {
    // Deliberately strip event as it includes `sender` 
    ipcRenderer.on('response', (event, ...args) => fn(...args));
  }
})