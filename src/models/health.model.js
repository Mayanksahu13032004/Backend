import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const patientSchema=new Schema(
  {
  name:{
    type:String,
    required:true
  },
  diagonsedWith:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    required:true
  },
  bloodGroup:{
    type:String,
    required:true
  },
   gender:{
     type:String,
     enum:["M","F","O"],
     required:true
   },
  addmitedIn:{
    type:String,
    required:true
  },
},{timestamps:true});

export const Patient=mongoose.model("Patient",patientSchema);