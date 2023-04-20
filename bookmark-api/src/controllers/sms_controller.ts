import { Request, Response, NextFunction } from "express"
import Validator from "../utils/validator"
import * as smsService from "../services/sms_service"

export const sendHandler = async (req: Request<any>, res: Response, next: NextFunction) => {
    try {
        const v = new Validator(req.body)
        v.required("telphone")
        v.check(v.isPhone(req.body.telphone), "telephone", "手机号码不正确")
        
        if(!v.valid()){
            console.log(v.valid(), v.errors)
            return res.status(400).json({status:"fail", "message": v.get()})
        }
        res.json({ "code":  smsService.createSMSCode(req.body.telphone)})

    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: '发送短信验证码失败',
        });
    }
}

