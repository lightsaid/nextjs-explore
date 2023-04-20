import "dotenv/config"
import express, { Request, Response, NextFunction } from "express" 
import cookieParser from "cookie-parser"
import morgan from "morgan"
import path from "path"
import AppError from "./utils/app_error"
import { Prisma } from "@prisma/client"
import authRoute from "./routes/auth_route"
import userRoute from "./routes/user_route"
import categoryRoute from "./routes/category_route"
import bookmarkRoute from "./routes/bookmark_route"
import smsRoute from "./routes/sms_route"
import { authenticated } from "./middleware/index"

console.log(">>> env: ",process.env)

const config = {
    serverPort: process.env.SERVER_PORT || 2000
}

const app = express()

// 解析参数、cookie、json 
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.json())

// 记录请求日志
app.use(morgan("dev"))

// api路由
app.use("/v1/auth", authRoute)
app.use("/v1/users", authenticated, userRoute)
app.use("/v1/categories", authenticated, categoryRoute)
app.use("/v1/bookmarks", authenticated, bookmarkRoute)
app.use("/v1/sms", smsRoute)

// 静态资源
app.use(express.static(path.join(__dirname, "static")))

// 图片资源重定向
app.use((req, res, next) => {
    if (req.originalUrl.startsWith("/static/")) {
        let url = req.originalUrl.split("/static")[1]
        if (url) {
            return res.redirect
        }
    }
    next()
})

// 404 错误处理
app.use((req, res, next)=> {
    next(new AppError(404, `${req.originalUrl} not found`))
})

// 其他错误处理
app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    // 更多状态码处理：
    // https://www.prisma.io/docs/reference/api-reference/error-reference#p1012
    if (error instanceof Prisma.PrismaClientKnownRequestError){
        if (error.code === "P2018" || error.code === "P2025") {
            return res.status(404).json({
                "status": "fail",
                "message": "记录不存在"
            })
        }

        if (error.code === "P2003") {
            return res.status(400).json({
                "status": "fail",
                "message": "无法删除，有关联数据"
            })
        }
    }

    error.status = error.status || "error"
    error.statusCode = error.statusCode || 500

    console.error(">>> response error: ", "status=", error.status, "message=",  error.message)

    if (error.message.length > 20) {
        error.message = "服务内部错误"
    }
    
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message
    })
})

app.listen(config.serverPort, () => {
    console.log("server start on " + config.serverPort)
})