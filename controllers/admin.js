import { user, lecture ,leave} from "../models/userSchema.js"

export async function showDashboard(req, res) {
    let data = await user.find();
    return res.render("admin", { data: data });
}
export async function getTeacherData(req, res) {
    let teacherEmail = req.body.teacherEmail;
    // console.log("email select in select tage: ",teacherEmail)
    let teacherData = await user.findOne({ email: teacherEmail });
    const lectures = await lecture.find({ teacherEmail: teacherEmail })
    // console.log("teacherData",teacherData);

    if (!teacherData) {
        console.log("data is not assign");
        // return res.send("data is not assign")
    }
    req.session.teacherData = teacherData;

    return res.json({ teacherData, lectures })
}
export async function saveLectureData(req, res) {
    try {

        let lectureData = req.body;
        // console.log(lectureData)
        let newLecture = new lecture({
            teacherEmail: lectureData.teacher,
            lecture: lectureData.lecture,
            subject: lectureData.subject,
            day: lectureData.day,
            start: lectureData.start,
            end: lectureData.end,
            room: lectureData.room,
        });
        await newLecture.save();
        const updatedUser = await user.findOneAndUpdate({
            email: lectureData.teacher
        }, {
            $push: {
                lecture: newLecture._id
            }
        }, { new: true })

        // console.log(updatedUser,newLecture);
        return res.status(200).json({ msg: 'data successful save'})

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err: 'internal error' })
    }
}

export async function getLeaveData(req,res){
   const leaveData = await leave.find();
   console.log("leave request teacher",leaveData);
   return res.json({leaveData})
}

export async function approveLeave(req,res){
    const {_id} = req.body;
    const leaveUpdate = await leave.findOneAndUpdate({_id},{$set:{status:"approved"}},{new:true})
    if(!leaveUpdate){
        return res.status(404).json({msg:"leave not found"})
    }
    return res.json({msg:'success'});

}

export async function rejectLeave(req,res){
    const {_id} = req.body;
    const leaveUpdate = await leave.findOneAndUpdate({_id},{$set:{status:"rejected"}},{new:true})
    if(!leaveUpdate){
        return res.status(404).json({msg:"leave not found"})
    }
    return res.json({msg:'success'});

}


export async function getLecturesOfEmail(req, res) {
  try {
    const email = req.params.email;

    // Step 1: Get lectures of this teacher
    const lectures = await lecture.find({ teacherEmail: email });

    // Step 2: Get all teachers
    const allTeachers = await user.find({ role: "teacher" });

    // Prepare final data
    const result = [];

    for (let lec of lectures) {
      const { start, end, day } = lec;

      // Step 3: Filter teachers based on:
      //  - Not on leave on that day
      //  - No overlapping lecture at that time

      // 3.1 Get teachers not on leave that day
      const teachersNotOnLeave = await leave.find({
        status: "approved"
      });

      const leaveEmails = teachersNotOnLeave.map(l => l.email);

      // 3.2 Filter teachers not on leave
      let availableTeachers = allTeachers.filter(teacher => {
        return !leaveEmails.includes(teacher.email);
      });

      // 3.3 Now filter based on no overlapping lecture
      const teacherEmails = availableTeachers.map(t => t.email);
      const lecturesOnSameDay = await lecture.find({
        teacherEmail: { $in: teacherEmails },
        day: day
      });

      // Remove teachers who already have lecture at same time
      availableTeachers = availableTeachers.filter(t => {
        const tLectures = lecturesOnSameDay.filter(l => l.teacherEmail === t.email);
        for (let l of tLectures) {
          if (
            (start >= l.start && start < l.end) ||
            (end > l.start && end <= l.end) ||
            (start <= l.start && end >= l.end)
          ) {
            return false;
          }
        }
        return true;
      });

      // Push result for this lecture
      result.push({
        lecture: lec,
        availableTeachers: availableTeachers.map(t => ({
          name: t.name,
          email: t.email
        }))
      });
    }

    return res.json({ lectures: result });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
