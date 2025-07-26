let signupform=document.getElementById("signupform");

signupform.addEventListener("submit",async(event)=>{
    event.preventDefault()
    let response= await fetch("/signup/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            name:document.getElementById("name").value,
            email:document.getElementById("email").value,
            password:document.getElementById("password").value,
            role:document.getElementById("role").value,
        }),
    })
    if(response.ok)
     window.location.href='/login'
});