import sevenBin from "7zip-bin";
import Seven from "node-7z";
import * as main from "../index";
import { app } from "electron";
import * as path from "path";

const path7za = sevenBin.path7za;
const pathTo7zip = path.join(__dirname, "native_modules", `7za${(process.platform === "win32") ? ".exe" : ""}`);
//console.log(path7za);
//console.log(pathTo7zip);


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
    })
       
    myStream.on('error', (err:any):any => {
        console.error(err);
        return null;
    });
    return null;
}