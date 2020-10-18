export async function ask(question:string) {

    (document.querySelector("#confirmationQuestion") as HTMLElement).innerText = question;
    const confirmationDiv = document.querySelector("#confirmationDiv");
    confirmationDiv.classList.remove("hidden");

    const confirm = new Promise(resolve => {
        confirmationDiv.addEventListener("click", function emitOnce(e) {
            const target = e.target as HTMLElement;
            
            if (target.tagName === "BUTTON") {
                confirmationDiv.classList.add("hidden");
                confirmationDiv.removeEventListener("click", emitOnce);
                resolve(target.innerText === "Yes");
            }

        })
    });
    
    return await confirm;
}