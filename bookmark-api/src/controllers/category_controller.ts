import { Request, Response, NextFunction } from "express"
import Validator from "../utils/validator"

import * as categoryService from "../services/category_server"


export const createCategoryHandler =async (req: Request<any>, res: Response, next: NextFunction) => {
    try {
        let v = new Validator(req.body)
        v.required("name")
        if (!v.valid()) {
            return res.status(400).json({status: "fail", "message": v.get()})
        }
        let user = res.locals.user
        let input = {
            name: req.body.name,
            parentId: req.body.parentId,
            user: {
                connect: {
                    id: user.id
                }
            }
        }

        let data = await categoryService.createCategory(input)
        res.json(data)
    } catch (error) {
        next(error)
    }
}

export const updateCategoryHandler =async (req: Request<any>, res: Response, next: NextFunction) => {
    try {
        let v = new Validator(req.body)
        v.required("name")
        if (!v.valid()) {
            return res.status(400).json({status: "fail", "message": v.get()})
        }

        let id = req.params.id

        let where = {
            id: Number(id)
        }

        let input = {
            name: req.body.name,
        }

        let data = await categoryService.updateCategory(where, input)
        res.json(data)
    } catch (error) {
        next(error)
    }
}

export const listCategoryHandler =async (req: Request<any>, res: Response, next: NextFunction) => {
    try {
        let user = res.locals.user
        let data = await categoryService.getCategories(user.id)
        res.json(data)
    } catch (error) {
        next(error)
    }
}

export const deleteCategoryHandler =async (req: Request<any>, res: Response, next: NextFunction) => {
    try {
        let id = Number(req.params.id)
        let data = await categoryService.deleteCategory(id)
        res.json(data)
    } catch (error) {
        next(error)
    }
}