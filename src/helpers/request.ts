export function sendRequest(val:any, fn:string, callback:string) {
    (window as any).mainApi.request({val, fn, callback});
}
