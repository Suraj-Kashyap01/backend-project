// controllers/teacherLeave.js

const teacherLeave = async (req, res) => {
    res.render("teacherLeave");
};

const teacherLeavePost = async (req, res) => {
    console.log("teacherpost = ", req.body);
    res.json({ msg: "kuc be" });
};

export default {
    teacherLeave,
    teacherLeavePost
};
