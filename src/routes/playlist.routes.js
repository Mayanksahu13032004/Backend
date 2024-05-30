import { Router } from "express";
import { createPlayList } from "../controllers/playlist.controller";

const router=Router()

router.route("/playlist").post(createPlayList)


export default router

