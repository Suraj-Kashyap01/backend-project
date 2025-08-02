let email = document.querySelector("#email");
let password = document.querySelector("#pass");
let role = document.querySelector("#role");

let loginform = document.querySelector(".loginform");

loginform.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        let response = await fetch("/auth/login/identify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
                role: role.value,
            }),
        });
        let data = await response.json();
        console.log("data response in login page",data);
    
         if(data.role=="admin"){
            window.location.href = "/admin/dashboard";
         }
         else if(data.role=="teacher"){
              window.location.href = "/teacher/page";
         }else{
            alert(data.message)
         }

    } catch (err) {
        console.error("Fetch Error:", err);
        alert("Something went wrong: " + err.message);
    }
});
