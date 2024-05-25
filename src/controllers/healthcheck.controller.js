import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js"
import {Patient} from "../models/health.model.js"

const healthcheck= asyncHandler(async(req,res)=>{

    const {email,username,password}=req.body
    console.log(email);
    console.log(username);
    console.log(password);
// todo:-bild a healthcheck response that simply returns the ok status as json with a message
   
console.log("health check");
    console.log('Request Body:', req.body);


    const {gender,age}=req.body
    console.log(gender);
    console.log(age);


   const PatientOne= await Patient.findOne({
        $or:[{gender},{age}]
     })
     console.log(gender);
   
     console.log("patient is exist",PatientOne);
    if(!PatientOne){
        throw new ApiError(404,"patient does not exist")
    }

    return res
 .status(200)
 .json(new ApiResponse(200,{},"The health was good"))

})

export {
    healthcheck,
}





