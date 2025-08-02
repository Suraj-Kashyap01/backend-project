import { json } from "express";

import { user,lecture ,leave} from "../models/userSchema.js";

 export async function teacherPage(req,res){
    let currentEmail=req.session.email;
    console.log("currentEmail",currentEmail)
    let teacher= await user.findOne({email:currentEmail});
    let lectures=await lecture.find({teacherEmail:currentEmail});
    console.log("teacheremail",teacher);
    
    if(!teacher){
        return res.status(404),json({msg:"data not found"});
    }
    teacher.uploadsFileName=null
    return res.render("teacher",{teacher,lectures});
}
export async function teacherLeave(req,res){
    const {to,from,reason}=req.body;
    console.log(to,from,reason);
    if(!to || !from || !reason){
        return res.status(400).json({msg:"please fill all fields"});
    }
    try{
    let currentEmail=req.session.email;
    let leavedata= new leave({
        email:currentEmail,
        to:req.body.to,
        from:req.body.from,
        reason:reason
    })
    await leavedata.save();
    return res.status(200).json({msg:"data save successful"})
 }catch(err){
    return res.status(500).json({err:'internal error'})
 }    
}