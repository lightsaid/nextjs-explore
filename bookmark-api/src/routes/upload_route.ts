import { Request, Response, NextFunction } from "express"
import formidable from 'formidable'
import { parse } from 'path'
import express from "express"

const router = express.Router()

// uploadHandler 上传文件
export const uploadHandler = async (req: Request, res: Response, next: NextFunction) => {
    // 解析上传文件数据
    const form = formidable({
        maxFileSize: 4<<20, // 4M
        maxFields: 3, // 一次最多上传3个
        uploadDir: process.env.UPLOAD_FILEPATH,
        keepExtensions: true // 保留原文件名
    })

    form.parse(req, (err, data, files) => {
        if (err) {
            return next(err)
        }
        try {
            if (files && files.image && files.image.size > 0) {
                data.filename = files.image.originalFilename
                data.filetype = files.image.mimetype
                data.filesize = Math.ceil(files.image.size / 1024) + 'KB'
                data.imageurl = process.env.SAVE_UPLOAD_PATH + parse(files.image.filepath).base
            }
            res.json(data)
        } catch (error) {
            next(error)
        }
    })
}


router.post("/", uploadHandler)

export default router