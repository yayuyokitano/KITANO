import { app } from "electron";
import { promises as fs } from "fs";
import * as path from "path";

const configPath = path.join(app.getPath("userData"), "config.json");

export async function getSetting(navInstruction: string[]) {
    const configStatus = await settingsExist("");
    if (typeof configStatus === "string") {
        console.error("ERROR: " + configStatus);
        return null;
    } else if (configStatus === 0) {
        await createSettings("");
    }

    let fileContent = JSON.parse(
        (await fs.readFile(configPath)).toString()
    );
    for (let property of navInstruction) {
        fileContent = fileContent[property];
    }
    return fileContent;
    
}

export async function setSettings(settings: any) {
    await fs.writeFile(configPath, JSON.stringify(settings), "utf-8");
    return "complete";
}

export async function createSettings(unused:any):Promise<null> {

    const defaultSettings = {
        appearance: {
            theme: "light"
        }
    }

    await setSettings(defaultSettings);
    return null;
}

export async function settingsExist(unused:any) {
    try {
        let file = await fs.open(configPath, "r");
        await file.close();
        return 1;
    } catch(e) {
        if(e.code === "ENOENT") {
            return 0;
        } else {
            return e.code;
        }
    }
}

export async function modifySetting(args:any): Promise<any> {
    const settings = { settings: await getSetting([]), change: args};
    if (settings.change) {
        let target = settings.settings;
        for (let i = 0; i < settings.change.navInstruction.length - 1; i++) {
            target = target[settings.change.navInstruction[i]];
        }
        target[settings.change.navInstruction[settings.change.navInstruction.length - 1]] = settings.change.val;
    }
    await setSettings(settings.settings);
    return null;
}