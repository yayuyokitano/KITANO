/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

//import light from "./theme/light.lazy.css";
//import dark from "./theme/dark.lazy.css";

console.log('👋 This message is being logged by "renderer.js", included via webpack');

function sendRequest(val:any, callback:any) {
    (window as any).mainApi.request({val, callback});
}

(window as any).mainApi.onResponse((args:any) => {
    console.log(args);
    (callbackList as any)[args.callback](args.val);
});

sendRequest("yeeet", "yeetfn");

const callbackList = {
    "yeetfn": yeetfn
}

function yeetfn(args:any) {
    console.log("yeet " + args);
}