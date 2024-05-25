import { Router } from "express";
import {upload} from "..//middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {  healthcheck } from "../controllers/healthcheck.controller.js";


const router=Router()

router.route("/health").post(healthcheck)


export default router