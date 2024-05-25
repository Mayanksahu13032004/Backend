import mongoose,{Schema} from "mongoose";

const patientSchema=new Schema({
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
  patientId:{
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
    type:mongoose.Schema.Types.ObjectId,
    ref:"Hospital"
  },
},{timestamps:true});

export const Patient=mongoose.model("Patient",patientSchema);