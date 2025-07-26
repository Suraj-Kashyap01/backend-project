import { json } from "express";
import { readFileCustom } from "./fileOperation.js";
import path from "path";

 async function teacherPage(req,res){

    console.log(req.session.email);
    let currentEmail=req.session.email;
    let data= await readFileCustom(path.join('./','data.json'));
    if(!data){
        return res.status(404),json({msg:"data not found"});
    }
    let teacher=data.find((item) => item.email==currentEmail);
    teacher.uploadsFileName=null
    return res.render("teacher",{teacher});
}
export default teacherPage;