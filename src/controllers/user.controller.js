import {asyncHandler} from  "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        console.log("here we are ");
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        // console.log("accessToken : ",accessToken);
        // console.log("refreshToken: ",refreshToken);

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        console.log("access and refresh token");
        return {accessToken, refreshToken}


    } catch (error) {
        console.error("Error generating tokens:", error);
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}







const registerUser=asyncHandler(async(req,res)=>{
//   get user details from frontend
// validation check not empty
// check if users already exits: note check with username or email
// check for images check for avatar
// upload them to clodnary,avatar
// create user object-create entry in db
// remove password and refresh token filed from response
// check fofr user creation 
// return response

const {fullname,email,username,password}=req.body
console.log("email:",email);

// for beginner
// if (fullname==="") {
//     throw new ApiError(400,"Fullname is required")
// }

if (
    [fullname,email,username,password].some((field)=>
        field?.trim()==="")
) {
    throw new ApiError(400,"All fields are required")
}

const existeduser=await User.findOne({
    $or:[{username},{email}]
})

if (existeduser) {
    throw new ApiError(409,"user with email or username already exits")
}

const avatarLocalPath = req.files?.avatar[0]?.path;
// const coverImageLocalPath=req.files?.coverImage[0]?.path;

let coverImageLocalPath;
if(req.files && Array.isArray(req.files.coverImage)&& req.files.coverImage.length>0){
coverImageLocalPath=req.files.coverImage[0].path
}

if (!avatarLocalPath) {
    throw new ApiError(400,"Avatar file is required ")
}


// upload on cloudnaarry

const avatar= await uploadOnCloudinary(avatarLocalPath)
const coverImage= await uploadOnCloudinary(coverImageLocalPath)


if (!avatar) {
    throw new ApiError(400,"Avatar file is required ")
}


const user=await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url||"",
    email,
    password,
    username:username.toLowerCase()
})
// ye 2 field nahi aayegi
const createdUser=await User.findById(user._id).select("-password -refreshToken")

if (!createdUser) {
    throw new ApiError(500,"Something went wrong  while register user")
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered Successfully")
)
})

const loginUser=asyncHandler(async(req,res)=>{
        //  request body data
        // user name or email
        // find the user 
        // password check
        // access and refresh token
        // send cookie

        const {email,username,password}=req.body
        console.log(email);
        if (!username || !email) {
           
            throw new ApiError(400,"username or email is required")
        }
    

        const user= await User.findOne({
            $or:[{username},{email}]
        })

        if(!user){
            throw new ApiError(404,"user does not exist")
        }

        const isPasswordValid= await user.isPasswordCorrect(password)

        if(!isPasswordValid){
            throw new ApiError(401,"Invalid user")
        }

        const {accessToken,refreshToken}= await generateAccessAndRefereshTokens(user._id)
        // console.log("accessToken : ",accessToken);  
        // console.log("refreshToken: ",refreshToken);
        // console.log(user._id);
      


        const logggedInUser = await User.findById(user._id).select("-password -refreshToken")
       

        const options={ 
            httpOnly:true,
            secure:true
        }
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            new ApiResponse(
                200,
                {
                    user : logggedInUser ,accessToken,refreshToken
                },
                "user logged in successfully"
            )
        )

        })

        const logoutUser=asyncHandler(async(req,res)=>{
            await User.findByIdAndUpdate(
                req.user._id,
                {
                    $set:{
                        refreshToken:undefined
                    }
                },
                {
                    new:true
                }
            )
            const options={
                httpOnly:true,
                secure:true
            }
            return res
            .status(200)
            .clearCookie("accessToken",options)
            .clearCookie("refreshToken",options)
            .json(new ApiResponse(200,{},'User logout successfully'))
        })




export {
    registerUser,
loginUser,
logoutUser
}