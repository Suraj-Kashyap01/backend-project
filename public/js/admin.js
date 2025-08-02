
//admin page 
let adminPage = document.getElementById("admin-page");
let timetablePage = document.getElementById("timetable-page");
let tableShowBtn = document.querySelector("#addtimetable");
let fullPage=document.querySelector(".fullpage");
// let main=document.querySelector(".main")
//addtimeTable page 

let cancelBtn = document.querySelector(".cancel-btn");
let saveBtn = document.querySelector(".save-btn");

console.log(saveBtn)
let lecture = document.getElementById("lecture");
let subject = document.getElementById("subject");
let start = document.getElementById("start");
let end = document.getElementById("end");
let day = document.getElementById("day");
let room = document.getElementById("room");
let logout = document.getElementById("logout");

//  Email dropdown change = fetch teacher data
let emailDropdown = document.getElementById("userEmail");
emailDropdown.addEventListener("change", async function () {
  let teacherEmail = this.value;
  try {
    let response = await fetch("/admin/dashboard/teacherdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teacherEmail })
    });
    let teacherResponse = await response.json();

    console.log("admin fetch post request return:", teacherResponse.lectures);

     printData( teacherResponse.lectures);
  }
  catch (err) {
    console.error("Fetch failed:", err);
  }
});
//  Add timetable button click = fetch timetable data

function printData(lectures){
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  for (let i = 0; i < days.length; i++) {
      for (let j = 1; j < 9; j++) {
        const cell = document.querySelector(`#${days[i]}-${j}`);
        cell.innerHTML = '';
      }
    }
    lectures?.forEach((item) => {
      console.log(item)

      for (let i = 0; i < days.length; i++) {
        for (let j = 1; j < 9; j++) {
          const cell = document.querySelector(`#${days[i]}-${j}`)
          if (item.day == days[i] && item.lecture == j) {
            cell.innerHTML = `subject: ${item.subject},lecture: ${item.lecture},time: ${item.start},end${item.end},room: ${item.room}`;
          }
        }
      }
    });
}
//  Add Time Table  page show :button click
tableShowBtn.addEventListener('click', (e) => {
  e.preventDefault(); // prevent form submit
  console.log(emailDropdown.value)
  if (emailDropdown.value == 'teacherEmail') {
    alert("Please select a teacher");
    return;
  }
  fullPage.classList.add("blur");
  timetablePage.style.display = "block";
});

//  Cancel or Save
function hideTimetableForm() {
  timetablePage.style.display = "none";
  fullPage.classList.remove("blur");
}

cancelBtn.addEventListener("click", hideTimetableForm);

  saveBtn.addEventListener("click", async (e) => {
    console.log("savetimetable",e)
    e.preventDefault();
    try {
      if (lecture.value == '' || subject.value == '' || start.value == '' || day.value == '' || room.value == '' || emailDropdown.value == 'teacherEmail') {
        alert('please input all fields')
        return;
      }

      let response = await fetch("/admin/dashboard/savetimetable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lecture: lecture.value,
          subject: subject.value,
          start: start.value,
          end: end.value,
          day: day.value,
          room: room.value,
          teacher: emailDropdown.value,
        }),
      });

      let jsobject = await response.json();
      if(jsobject.ok){
        alert(jsobject.msg);
      }
        document.querySelector(".timetable-form").reset();
      hideTimetableForm();
    } catch (err) {
      console.error("Error saving timetable:", err);
    }
  });

