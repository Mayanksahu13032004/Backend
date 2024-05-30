import { Router } from "express";
import { registerPatient } from "../controllers/healthcheck.controller.js";


import { Patient } from "../models/health.model.js";


const router=Router()

router.route("/health").post(registerPatient)


export default router