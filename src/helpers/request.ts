export function sendRequest(val:any, fn:any, callback:any) {
    (window as any).mainApi.request({val, fn, callback});
}