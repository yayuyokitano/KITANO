export function handleDeckSettings(settings:any) {
    (document.querySelector("#maxCardsPerDay") as HTMLInputElement).value = settings.revPerDay;
    (document.querySelector("#newCardsPerDay") as HTMLInputElement).value = settings.newPerDay;
}