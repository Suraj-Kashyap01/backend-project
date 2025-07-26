import { fileURLToPath } from "url";
import { readFileCustom } from "./fileOperation.js";
import path from "path";

export async function showDashboard(req,res){
    let data=await readFileCustom(path.join('./','data.json'));
    // console.log(data);
    console.log("dashboard controller:",req.session.email)
    let teacher=req.session.email;
    console.log("teacher email in dashboard controller:",teacher);
    return res.render('admin',{data:data});
}
export async function timetable(req,res){
    const { teacherEmail } = req.body;
  let data = await readFileCustom(path.join('./', './data/data.json')); // Adjust as per your code
  let matchEmail = data.find(u => u.email == teacherEmail);
  res.render("admin", { data, matchEmail });

}
