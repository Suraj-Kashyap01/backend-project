
let approveLeaveSection = document.querySelector(".approve-leave-section");
let approveLeavebtn = document.querySelector("#approve-leave")
// let adminPage=document.querySelector("#admin-page");
let main = document.querySelector(".main")
let section = document.querySelector(".section")
let check = false;

approveLeavebtn.addEventListener("click", function () {
  if (!check) {
    main.style.display = "none";
    approveLeaveSection.style.display = "block";
    check = true;
  } else {
    approveLeaveSection.style.display = "none";
    main.style.display = "block";
    check = false;
  }
});

approveLeavebtn.addEventListener("click", async () => {
  let response = await fetch("/admin/dashboard/getleavedata", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  let data = await response.json()
  createLeaveSection(data.leaveData);
});
// this function create leave section
function createLeaveSection(data) {
  console.log(data)
  data.forEach((leave) => {
    let card = document.createElement("div");
    card.className = "leave-card";

    card.innerHTML = `
        <h3><strong>Email:</strong> ${leave.email}</h3>
        <p><strong>Date:</strong> ${leave.date?.substring(0, 10)}</p>
        <p><strong>Reason:</strong> ${leave.reason}</p>
        <button id="approve"onclick="approve('${leave._id}')">Approve</button>
        <button id="reject"onclick="reject('${leave._id}')">Reject</button>
        <button id="assign"onclick="getLectures('${leave.email}')">Assign Teacher</button>

        `;
        
    section.appendChild(card);
  });
}

async function getLectures(email) {
    const response  = await fetch(`/admin/dashboard/${email}`)
    if(!response.ok){
      alert(response.msg);
      return;
    }
    const data = await response.json();
    // console.log(data)
}

async function approve(data){
  const d={
    _id:data
  }
  const response = await fetch('/admin/dashboard/approve',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(d)
  })
  if(!response.ok){
    alert(response?.msg ?? 'error')
    return;
  }
  alert('approved');
}

async function reject(data){
  const d={
    _id:data
  }
  const response = await fetch('/admin/dashboard/reject',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(d)
  })
  if(!response.ok){
    alert(response?.msg ?? 'error')
    return;
  }
  alert('reject');
}