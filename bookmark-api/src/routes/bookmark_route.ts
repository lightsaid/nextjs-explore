import express from "express"
import * as bookmarkController from "../controllers/bookmark_controller"

const router = express.Router()

// 创建书签
router.post("", bookmarkController.refreshXXXHandler)

// 更新书签
router.put("/:id", bookmarkController.refreshXXXHandler)

// 删除书签
router.delete("/:id", bookmarkController.refreshXXXHandler)

// 根据分类id获取书签列表
router.get("/:categoryId", bookmarkController.refreshXXXHandler)

export default router