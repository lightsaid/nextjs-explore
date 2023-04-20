import { Request, Response, NextFunction } from "express"
import Validator from "../utils/validator"
import * as smsService from "../services/sms_service"
import bcrypt from "bcryptjs"
import { Prisma } from "@prisma/client"
import { createUser, findUniqueUser } from "../services/user_service"
import AppError from "../utils/app_error"
import jwt from "jsonwebtoken"


export const registerHandler = async (req: Request<any>, res: Response, next: NextFunction) => {
    try {
        // 验证
        const v = new Validator(req.body)
        v.required("name", "telphone", "password", "code")
        v.minLength("name", 2)
        v.maxLength("password", 12)
        v.minLength("password", 6)
        v.maxLength("password", 16)
        v.check(v.isPhone(req.body.telphone), "telphone", "手机号码不正确")
        console.log(v.valid(), v.errors)

        if (!v.valid()) {
            return res.status(400).json({ status: "fail", "message": v.get() })
        }

        // 验证验证码是否正确
        let message = smsService.verifyCode(req.body.telphone, req.body.code)
        if (message != smsService.errCodeSuccess) {
            return res.status(400).json({ status: "fail", "message": message })
        }

        // 不管是否成功，删除改验证码 
        smsService.deleteCode(req.body.telphone, req.body.code)

        let hashedPwsd = await bcrypt.hash(req.body.password, 10)

        let user: Prisma.UserCreateInput = {
            telphone: req.body.telphone,
            password: hashedPwsd,
            name: req.body.name
        }

        let data = await createUser(user)

        res.json(data)

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(400).json({
                    status: 'fail',
                    message: '手机号码已存在',
                });
            }
        }
        next(error)
    }
}

enum loginType {
    PASS = "0", // 密码登录
    SMS = "1"  // 验证码登录
}

export const loginHandler = async (req: Request<any>, res: Response, next: NextFunction) => {
    try {
        const { telphone, type: loginForm, code, password } = req.body

        // 验证
        const v = new Validator(req.body)
        v.required("telphone", "type")
        v.check(v.isPhone(telphone), "telphone", "手机号码不正确")

        if (loginForm === loginType.PASS) {
            v.required("password")
            v.minLength("password", 6)
            v.maxLength("password", 16)
        }

        if (loginForm === loginType.SMS) {
            v.required("code")
            let message = smsService.verifyCode(telphone, code)
            // 不管是否成功，删除改验证码 
            smsService.deleteCode(req.body.telphone, req.body.code)
            if (message != smsService.errCodeSuccess) {
                return res.status(400).json({ status: "fail", "message": message })
            }
        }

        if (!v.valid() || ![loginType.PASS, loginType.SMS].includes(loginForm)) {
            console.log(v.valid(), v.errors)
            return res.status(400).json({ status: "fail", "message": v.get() || "入参不正确" })
        }

        // 查找用户
        let user = await findUniqueUser({ telphone: req.body.telphone })

        if (!user) {
            return next(new AppError(400, '你还没注册～'));
        }

        // 密码登录
        if (loginForm === loginType.PASS) {
            if (!(await bcrypt.compare(req.body.password, user.password))) {
                return next(new AppError(400, '密码或手机号无效'));
            }
        }

        // 生成 access_token 和 refresh_token
        const access_token = jwt.sign({ uid: user.id }, process.env.TOKEN_SECRET!, { expiresIn: process.env.ACCESSTOKEN_EXPIRES })
        const refresh_token = jwt.sign({ uid: user.id }, process.env.TOKEN_SECRET!, { expiresIn: process.env.REFRESHTOKEN_EXPIRES })

        res.cookie("refresh_token", refresh_token, { httpOnly: true, maxAge: Number(process.env.COOKIE_MAXAGE) })

        res.json({
            id: user.id,
            telphone: user.telphone,
            username: user.name,
            avatar: user.avatar,
            access_token,
            refresh_token
        })

    } catch (error) {
        next(error)
    }
}

// refreshTokenHandler 更新 access_token
export const refreshTokenHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies["refresh_token"];
        const payload: any = jwt.verify(refreshToken, process.env.TOKEN_SECRET!);
        if (!payload) {
            return res.status(401).send({
                status: "fail",
                message: '请先登录'
            });
        }

        let user = await findUniqueUser({ id: payload.uid })
        if (!user){
            return res.status(401).send({
                status: "fail",
                message: '请先登录'
            });
        }

        const access_token = jwt.sign({
            uid: user.id
        }, process.env.TOKEN_SECRET!, { expiresIn: process.env.ACCESSTOKEN_EXPIRES  });

        res.json({
            access_token
        })
    } catch (e) {
        console.log(e)
        return next(new AppError(401, "请先登录"))
    }
}