import express from "express"
import * as userController from "../controllers/user_controller"

const router = express.Router()

router.get("/profile", userController.getProfileHandler)
router.post("/profile", userController.updateProfileHandler)

export default router