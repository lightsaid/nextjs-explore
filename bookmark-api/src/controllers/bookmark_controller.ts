import { Request, Response, NextFunction } from "express"
import Validator from "../utils/validator"

import * as bookmarkService from "../services/bookmark_server"


export const createBookmarkHandler =async (req: Request<any>, res: Response, next: NextFunction) => {
    try {
        let v = new Validator(req.body)
        v.required("name", "link", "categoryId")
        if (!v.valid()) {
            return res.status(400).json({status: "fail", "message": v.get()})
        }

        let input = {
            name: req.body.name,
            link: req.body.link,
            category: {
                connect: {
                    id: req.body.categoryId
                }
            }
        }

        let data = await bookmarkService.createBookmark(input)

        res.json(data)

    } catch (error) {
        next(error)
    }
}

export const updateBookmarkHandler =async (req: Request<any>, res: Response, next: NextFunction) => {
    try {
        let v = new Validator(req.body)
        v.required("name", "link")
        if (!v.valid()) {
            return res.status(400).json({status: "fail", "message": v.get()})
        }

        let id = Number(req.params.id)

        let where = {
            id
        }

        let input = {
            name: req.body.name,
            link: req.body.link,
        }

        let data = await bookmarkService.updateBookmark(where, input)

        res.json(data)

    } catch (error) {
        next(error)
    }
}

export const listBookmarkHandler =async (req: Request<any>, res: Response, next: NextFunction) => {
    try {
        let categoryId = Number(req.params.categoryId)
        let data = await bookmarkService.getBookmarks(categoryId)
        res.json(data)
    } catch (error) {
        next(error)
    }
}

export const deleteBookmarkHandler =async (req: Request<any>, res: Response, next: NextFunction) => {
    try {
        let id = Number(req.params.id)
        let data = await bookmarkService.deleteBookmark(id)
        res.json(data)
    } catch (error) {
        next(error)
    }
}