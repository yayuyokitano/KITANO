import * as request from "../helpers/request";

let droppedFiles = [];

window.addEventListener("dragover", e => {
    e.preventDefault();
    e.stopPropagation();
})

window.addEventListener("dragenter", () => {
    document.querySelector(".fileUpload")?.classList.add("is-dragover");
})

window.addEventListener("dragover", () => {
    document.querySelector(".fileUpload")?.classList.add("is-dragover");
})

window.addEventListener("dragleave", () => {
    document.querySelector(".fileUpload")?.classList.remove("is-dragover");
})

window.addEventListener("drop", e => {
    droppedFiles = Object.values((e as any).dataTransfer.files);
    handleFiles(droppedFiles);
});

async function handleFiles(droppedFiles:any) {
    if (!document.querySelector("#uploadProgressDiv").classList.contains("hidden")) {
        document.querySelector("#uploadProgressDiv").classList.remove("shake");
        setTimeout(() => {
            document.querySelector("#uploadProgressDiv").classList.add("shake");
        });
        return;
    }

    document.querySelector("#uploadProgressDiv").classList.remove("hidden");

    droppedFiles = droppedFiles.map(stripFile);

    iterateExtract(droppedFiles);

    return;
}

export function progressUpdate(progress:any) {
    (document.querySelector(".progressVal") as HTMLElement).style.width = `${progress.percent}%`;
}

export function endExtract(droppedFiles:any) {
    (document.querySelector(".progressVal") as HTMLElement).style.width = `0%`;
    if (droppedFiles?.length) {
        console.log(droppedFiles);
        iterateExtract(droppedFiles);
    } else {
        document.querySelector("#uploadProgressDiv").classList.add("hidden");
    }
}

export function iterateExtract(droppedFiles:any) {
    const file = droppedFiles.shift();
    let fileName = file.name.split(".");
    if (fileName.pop() === "apkg") {
        (document.querySelector(".currFile") as HTMLElement).innerText = file.name;
        console.log(droppedFiles);
        request.sendRequest({ fileName: fileName.join("_"), filePath: file.path, fileList: droppedFiles }, "extractDeck", "");
    }
}

function stripFile(e:any) {
    return {path: e.path, name: e.name}
}