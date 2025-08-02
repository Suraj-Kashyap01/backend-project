let signupform=document.getElementById("signupform");

signupform.addEventListener("submit",async(event)=>{
    event.preventDefault()
    let response= await fetch("/auth/signup/",{
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
    if(response.ok){
        alert("Signup successful!");
     window.location.href='/auth/login';
    }
    else if(response.status==400){
        alert("User already exists")
    }
    else {
  alert( "Signup failed!");
}
});
