import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import AppError from "../utils/app_error"
import { findUniqueUser } from "../services/user_service"

export const authenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let access_token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            access_token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.access_token) {
            access_token = req.cookies.access_token; ;
        }
        if (!access_token) {
            return next(new AppError(401, '请先登录'));
        }

        const payload: any = jwt.verify(access_token, process.env.TOKEN_SECRET!);
        if (!payload) {
            return res.status(401).send({
                status: "fail",
                message: '请先登录'
            });
        }

        let user = await findUniqueUser({ id: payload.uid })
        if (!user){
            return res.status(404).send({
                status: "fail",
                message: '用户不存在'
            });
        }
        res.locals.user = user
        next()
    } catch (error: any) {
        console.log("authenticated error: ", error.name)
        if (error?.name){
            if (error.name === "TokenExpiredError"){
                return next(new AppError(401, "登录失效，请重新登录"))
            }else if(error.name === "JsonWebTokenError" || error.name === "NotBeforeError"){
                return next(new AppError(401, "Token 认证失效"))
            }
        }
        next(error)
    }
}