import express from "express"
import * as authController from "../controllers/auth_controller"

const router = express.Router()

router.post("/register", authController.registerHandler)
router.post("/login", authController.loginHandler)
router.post("/refresh", authController.refreshTokenHandler)

export default router