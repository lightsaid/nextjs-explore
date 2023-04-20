import express from "express"
import * as categoryController from "../controllers/category_controller"

const router = express.Router()

// 创建分类
router.post("", categoryController.refreshXXXHandler)

// 更新分类
router.put("/:id", categoryController.refreshXXXHandler)

// 删除分类
router.delete("/:id", categoryController.refreshXXXHandler)

// 获取分类列表
router.get("", categoryController.refreshXXXHandler)

export default router