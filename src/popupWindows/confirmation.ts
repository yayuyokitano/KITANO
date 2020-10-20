import * as popup from "../listeners/popup";

export async function ask(question:string) {

    (document.querySelector("#confirmationQuestion") as HTMLElement).innerText = question;
    const confirmationDiv = document.querySelector("#confirmationDiv");

    popup.openPopup("#confirmationDiv");

    const confirm = new Promise(resolve => {
        confirmationDiv.addEventListener("click", function emitOnce(e) {
            const target = e.target as HTMLElement;
            
            if (target.tagName === "BUTTON") {
                confirmationDiv.removeEventListener("click", emitOnce);
                popup.closePopup("#confirmationDiv");
                resolve(target.innerText === "Yes");
            }

        })
    });
    
    return await confirm;
}
