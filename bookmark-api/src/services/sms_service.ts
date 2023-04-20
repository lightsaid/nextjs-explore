import { randomNumber } from "../utils/random"

// 模拟发送短信验证码，通过接口返回验证码

export type SMSType = {
    expire: Date
    code: number
}

export const smsMaps = new Map<String, SMSType>()

export const errCodeInvalid = "验证码无效"
export const errCodeExpired = "验证码过期"
export const errCodeSuccess = "SUCCESS"

export const createSMSCode = (telphone: string) => {
    // 设置5分钟时效
    let expire = new Date(Date.now() + 5 * 60 * 1000)
    let code = randomNumber(1000, 10000)

    let smscode:SMSType = {
        expire,
        code
    }

    console.log("telphone >>> : ", telphone)

    smsMaps.set(telphone, smscode)

    // 10分钟后删除
    let timer = setTimeout(()=>{
        let res = smsMaps.get(telphone)
        if (res) {
            smsMaps.delete(telphone)
        }
        clearTimeout(timer)
    }, 10 * 60 *1000)

    return code
}

export const verifyCode = (telphone: string, code: number) => {
    let res = smsMaps.get(telphone)
    smsMaps.forEach((item, key)=> {
        console.log(">>> ",item, "key: ", key)
    })

    if (!res || res.code != code) {
        return errCodeInvalid
    }

    let date = new Date()
    if (date > res.expire) {
        return errCodeExpired
    }

    return errCodeSuccess
}

export const deleteCode = (telphone: string, code: number) => {
    let res = smsMaps.get(telphone)
    if (res && smsMaps.get(telphone)?.code == code) {
        smsMaps.delete(telphone)
    }
}