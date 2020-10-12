import { app } from "electron";
import { promises as fs } from "fs";
import * as path from "path";

const configPath = path.join(app.getPath("userData"), "config.json");

export async function getSetting(navInstruction: string[]) {
    let fileContent = JSON.parse(
        (await fs.readFile(configPath)).toString()
    );
    for (let property of navInstruction) {
        fileContent = fileContent[property];
    }
    return fileContent;
}

export async function setSettings(settings: object) {
    await fs.writeFile(configPath, JSON.stringify(settings), "utf-8");
    return;
}

export async function createSettings(unused:any) {

    const defaultSettings = {
        appearance: {
            theme: "light"
        }
    }

    await setSettings(defaultSettings);
    return;
}

export async function settingsExist(unused:any) {
    try {
        console.log("sd");
        await fs.open(configPath, "r");
        console.log("ya");
        return "success";
    } catch(e) {
        console.log(e);
        console.log("e");
        return "no exis";
    }
}

export function logg(unused:any) {
    console.log("xd");
    return "abcvs";
}