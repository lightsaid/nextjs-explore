import express from "express"
import * as bookmarkController from "../controllers/bookmark_controller"

const router = express.Router()

// 创建书签
router.post("", bookmarkController.createBookmarkHandler)

// 更新书签
router.put("/:id", bookmarkController.updateBookmarkHandler)

// 删除书签
router.delete("/:id", bookmarkController.deleteBookmarkHandler)

// 根据分类id获取书签列表
router.get("/:categoryId", bookmarkController.listBookmarkHandler)

export default router