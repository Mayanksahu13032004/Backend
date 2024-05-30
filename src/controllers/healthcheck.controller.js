 import { asyncHandler } from "../utils/asyncHandler.js";
 import {ApiError} from "../utils/ApiError.js"
import { Patient } from "../models/health.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

 const registerPatient=asyncHandler(async(req,res)=>{
  
const {name,gender,age}=req.body
console.log("name:-",name);
console.log("gender:-",gender);
console.log("age:-",age);

if (
    [name,gender,age].some((field)=>
        field?.trim()==="")
) {
    throw new ApiError(400,"All fields are required")
}

const existedPatient=await Patient.findOne({
    $or:[{name},{age}]
})


if (existedPatient) {
    throw new ApiError(409,"user with email or username already exits")
}

 
const patient=await Patient.create({
    name,
    // diagonsedWith,
    gender,
    age,
    address,
    addmitedIn,
    bloodGroup
})


const createdPatient= await User.findById(user._id).select(
    "-addmitedIn"
)


if(!createdPatient){
    throw new ApiError(500,"Something went wrong  while register patient")
}


return res.status(201).json(
    new ApiResponse(200,createdPatient,"Patient registered Successfully")
)


 })

 export {registerPatient}