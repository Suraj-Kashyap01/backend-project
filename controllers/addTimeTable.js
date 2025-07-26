import { readFileCustom, writeFileCustom } from "./fileOperation.js";
import path from "path";
 
  function addTimeTable(req,res){
    res.render("addTimeTable");
}
// let filePath=path.join(__dirname,'../data/data.json');

  async function addData(req,res){
    console.log("addteacheremail= ",req.body.teacherEmail);
   let data= await readFileCustom(path.join('./','./data.json'));
  //  console.log(data);
   let index=data.find((item)=>{
    return item.email===req.body.teacherEmail;
   });
   console.log("index in addtime table page ",index);
   if(index===-1){
     return res.status(404).json({err:"user not found"});
   }
   data[index].lecture.push(req.body)

   let write=writeFileCustom(path.join('./','./data.json'),data)
   if(!write){
    return res.status(500).json({ err: 'internal error' });
   }
}
export  {addTimeTable,addData};
