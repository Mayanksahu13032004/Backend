import mongoose,{isValidObjectId} from "mongoose";
import {playlist} from "../models/playlist.model.js"
import { ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const  createPlayList=asyncHandler(async(req,res)=>{
    const {name,description}=req.body

    console.log(("Shree radhe"));

   return res.status(200).json(
    new ApiResponse(200,{},"crete playlist successfully")
   )


// create playlist

})

const getUserPlaylists=asyncHandler(async(req,res)=>{
    const {userId}=req.params
    // get user playlists
})

export {
    createPlayList,
    getUserPlaylists
}