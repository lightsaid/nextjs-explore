import express from "express"
import * as smsController from "../controllers/sms_controller"
const router = express.Router()

// 发短信
router.post("/send", smsController.sendHandler)

export default router