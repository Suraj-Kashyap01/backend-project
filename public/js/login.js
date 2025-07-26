let email = document.querySelector("#email");
let password = document.querySelector("#pass");
let role = document.querySelector("#role");

let loginform=document.querySelector(".loginform");

loginform.addEventListener("submit",async (e)=>{
    e.preventDefault();
     let response=await fetch("/login/identify",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            email:email.value,
            password:password.value,
            role:role.value,
            }),
     })
     if(response.ok){
        console.log(response)
        if(role.value=='teacher'){
            window.location.href='/teacher/page';
        }else {
            window.location.href='/admin/dashboard'
        }
     }
})

