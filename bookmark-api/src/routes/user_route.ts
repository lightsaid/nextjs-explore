import express from "express"
import * as userController from "../controllers/user_controller"

const router = express.Router()

router.get("/profile", userController.getProfileHandler)
router.put("/profile", userController.updateProfileHandler)

export default router