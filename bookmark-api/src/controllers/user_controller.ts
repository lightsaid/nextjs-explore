import { Request, Response, NextFunction } from "express"
import AppError from "../utils/app_error"
import Validator from "../utils/validator"
import { updateUser } from "../services/user_service"

type updateUserRequest = {
    username: string
    avatar: string
}


export const getProfileHandler = async (req: Request<any>, res: Response, next: NextFunction) => {
    if (res.locals.user) {
        return res.json(res.locals.user)
    } else {
        console.error("profileHandler authenticated 中间件获取用户信息失败")
        return new AppError(500, "未知错误")
    }
}

export const updateProfileHandler = async (req: Request<updateUserRequest>, res: Response, next: NextFunction) => {
    try {
        const v = new Validator(req.body)
        v.required("name", "avatar")
        if (!v.valid()){
            return res.status(401).json({status: "fail", message:v.get()})
        }

        let user = res.locals.user
        if (!user) {
            return res.status(401).json({status: "fail", message:"登录凭据失效"})
        }
       
        let input = {
            name: req.body.name,
            avatar: req.body.avatar
        }
       
        let newUser = await updateUser({id: user.id}, input)
        res.json(newUser)
    } catch (error) {
        next(error)
    }
}
