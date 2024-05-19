import { Router } from "express";
import {  loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import {upload} from "..//middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router()

router.route("/register").post(
    // register se phele milk jana milldelewares checking
 upload.fields([
{
name:"avatar",
maxCount:1
},
{
    name:"coverImage",
    maxCount:1
}
 ]),
    registerUser
)

router.route("/login").post(loginUser)
//secure route
router.route("/logout").post(verifyJWT, logoutUser) 
router.route("/refresh-token").post(refreshAccessToken)



// router.route("/login").post(login)
// router.route("/signup").post(signup)

export default router