import express from "express"
import * as categoryController from "../controllers/category_controller"

const router = express.Router()

// 创建分类
router.post("", categoryController.createCategoryHandler)

// 更新分类
router.put("/:id", categoryController.updateCategoryHandler)

// 删除分类
router.delete("/:id", categoryController.deleteCategoryHandler)

// 获取分类列表
router.get("", categoryController.listCategoryHandler)

export default router