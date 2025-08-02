
// teacher page Javascript
let teacherContainer=document.querySelector(".teacher-container")
let teacherLeave=document.querySelector(".teacher-leave")

let leaveBtn=document.querySelector("#leave")

let submitBtn=document.querySelector("#submit-btn")
let cancel = document.querySelector("#cancel");
leaveBtn.addEventListener('click',()=>{
    
    teacherContainer.classList.add("blur");
    teacherLeave.style.display="block";
})
function hideTeacherLeaveForm(){
    teacherLeave.style.display="none";
    teacherContainer.classList.remove("blur");
}
cancel.addEventListener("click",hideTeacherLeaveForm);

console.log(submitBtn)

submitBtn.addEventListener("click",async (e)=>{
  console.log("submit btn");
  
    e.preventDefault();
    let response=await fetch("/teacher/page/leave",{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            to:document.querySelector("#to").value,
            from:document.querySelector("#from").value,
            reason:document.querySelector("#text").value,
            status:"Pending",
          })
        })
        let data=await response.json();
        if(data.ok){
          alert(data.msg)
        }
        else{
          alert(data.msg)
        }
        console.log("teacher data",data);
        hideTeacherLeaveForm();
})