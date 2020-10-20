import sevenBin from "7zip-bin";
import Seven from "node-7z";
import * as main from "../index";
import { app } from "electron";
import * as path from "path";
import * as database from "../main/databaseParser";
import { promises as fs } from "fs";

const path7za = sevenBin.path7za; //required for webpack
const pathTo7zip = path.join(__dirname, "native_modules", `7za${(process.platform === "win32") ? ".exe" : ""}`);

export async function extractDeck(args:any):Promise<any> {
    const cardPath = path.join(app.getPath("userData"), "decks", args.fileName);
    const myStream = (Seven as any).extractFull(args.filePath, cardPath, { 
        $progress: true,
        $bin: pathTo7zip
    })
       
    myStream.on('progress', (progress:any) => {
        main.sendData(progress, "progressUpdate");
    })
       
    myStream.on('end', ():any => {
        main.sendData(args.fileList, "endExtract");
        executeEndOperations(cardPath);
        database.getDeckData(args.fileName);
    })
       
    myStream.on('error', (err:any):any => {
        console.error(err);
        return null;
    });
    return null;
}

async function executeEndOperations(cardPath:string) {
    let media = await fs.readFile(path.join(cardPath, "media"));
    media = JSON.parse(media.toString());
    let newMedia = {
        count: 0,
        media: {}
    };
    for (let [key, value] of Object.entries(media)) {
        newMedia.media[value] = key;
        newMedia.count++;
    }
    fs.writeFile(path.join(cardPath, "media"), JSON.stringify(newMedia));
}
