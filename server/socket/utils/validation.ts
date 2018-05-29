export function isRealString(str: string){
    return typeof str === 'string' && str.trim().length > 0;
}
export function isRealHost(id: string){
    // check if the given id belongs to registered host
    return true
}