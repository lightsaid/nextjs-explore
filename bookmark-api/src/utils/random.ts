
var character = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"

export function randomString(size: number): string{
    let str = ""
    const max = character.length
    for(let i = 0;i<size;i++){
        let index = Math.floor(Math.random() * max)
        str += character[index]
    }
    return str
}

export function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max-min) + min)
}