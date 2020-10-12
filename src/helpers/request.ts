export function sendRequest(val:any, callback:any) {
    (window as any).mainApi.request({val, callback});
}