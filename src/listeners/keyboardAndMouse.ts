import * as popup from "../popupWindows/popup";

window.addEventListener("click", e => {
    if ((e.target as HTMLElement).closest(".faded")) {
        popup.closeWeakPopup(".popup:not(.hidden)");
    }
    
    const currli = (e.target as HTMLElement).closest("#popupSetting li") as HTMLElement;
    const currMenu = currli?.innerText;

    ((e.target as HTMLElement).closest("button, li:focus") as HTMLElement)?.blur();
    currli?.blur();
    if (currMenu) {
        document.querySelector("#popupContent .display").classList.remove("display");
        document.querySelector(`#popupContent div[settingid="${currMenu}"]`).classList.add("display");

        document.querySelector("#popupSetting .currLi").classList.remove("currLi");
        document.querySelector(`#popupSetting li[value="${currMenu}"]`).classList.add("currLi");
    }
})

window.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        if (document.querySelector(".faded")) {
            popup.closeWeakPopup(".popup:not(.hidden)");
        } else if (document.querySelector("#strongPopup")) {
            popup.closeStrongPopup();
        }
        
    }

    if (e.key === "Enter" && (e.target as HTMLElement).tabIndex !== -1) {
        if ((e.target as HTMLElement).tagName !== "INPUT" && (e.target as HTMLElement).tagName !== "BUTTON") {
            (e.target as HTMLElement).click();
        }
        setTimeout(() => {
            if ((e.target as HTMLElement).parentElement.id === "popupSetting"){
                (document.querySelector('#popupContent .display [tabindex]:not([tabindex="-1"])') as HTMLElement).focus();
            }
        })
    }

    if (e.key === "Tab") {
        const prevFocus = document.querySelector(":focus");
        const currTab = document.querySelector(".currLi");
        setTimeout(() => {
            const currFocus = document.querySelector(":focus");
            const settingDiv = document.querySelector("#popupSetting");
            console.log(currFocus);
            console.log(prevFocus);
            if (currFocus?.closest("#popupSetting")) {
                if (prevFocus === null || prevFocus.closest("#popupContent") ) {
                    ((currTab.nextElementSibling || settingDiv.firstElementChild) as HTMLElement).focus();
                } else if (currFocus?.classList?.contains("currLi")) {
                    (document.querySelector('#popupContent .display [tabindex]:not([tabindex="-1"])') as HTMLElement).focus();
                }
            } else if (currFocus?.closest("#popupContent")) {
                if (prevFocus?.closest("#popupSetting")) {
                    if (!currTab.previousElementSibling) {
                        (document.querySelector('#popupContent .display [tabindex]:not([tabindex="-1"])') as HTMLElement).focus();
                    } else {
                        (settingDiv.firstElementChild as HTMLElement).focus();
                    }
                }
            }
        })
    }
})
