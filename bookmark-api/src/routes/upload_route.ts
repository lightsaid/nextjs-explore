import { Request, Response, NextFunction } from "express"
import formidable from 'formidable'
import { parse } from 'path'
import express from "express"

const router = express.Router()

// uploadHandler 上传文件，仅上传图片，限定类型和name <input type="file" id="image" name="image" accept="image/*" />
export const uploadHandler = async (req: Request, res: Response, next: NextFunction) => {
    // 解析上传文件数据
    const form = formidable({
        maxFileSize: 4 << 20, // 4M
        maxFields: 3, // 一次最多上传3个
        uploadDir: process.env.UPLOAD_FILEPATH,
        keepExtensions: true // 保留原文件名
    })
    // 解析并保存文件
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return next(err)
        }
        try {
            // <input type="file" id="image" name="image" accept="image/*" />
            if (files && files.image && files.image.size > 0) {
                fields.filename = files.image.originalFilename
                fields.filetype = files.image.mimetype
                fields.filesize = Math.ceil(files.image.size / 1024) + 'KB'
                fields.imageurl = process.env.UPLOAD_FILEPATH + parse(files.image.filepath).base
            }
            delete fields.title
            res.status(200).json({ fields })
        } catch (error) {
            next(error)
        }
    })
}


router.post("", uploadHandler)

export default router