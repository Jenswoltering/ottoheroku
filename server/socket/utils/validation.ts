export function isRealString(str: String){
    return typeof str === 'string' && str.trim().length > 0;
}
export function isRealHost(id: String){
    // check if the given id belongs to registered host
    return true
}