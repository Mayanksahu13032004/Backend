import mongoose,{isValidObjectId} from "mongoose";
import {playlist} from "../models/playlist.model.js"
import { ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const  createPlayList=asyncHandler(async(req,res)=>{
    const {name,description}=req.body

// create playlist

})

const getUserPlaylists=asyncHandler(async(req,res)=>{
    const {userId}=req.params
    // get user playlists
})