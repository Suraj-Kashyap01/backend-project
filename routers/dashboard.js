 import express from "express"
import { checkValidation, isAdmin } from "../middlewares/session.js";
import { showDashboard, getTeacherData, saveLectureData, getLeaveData,approveLeave, rejectLeave, getLecturesOfEmail} from "../controllers/admin.js";
// import { teacherLeave } from "../controllers/teacher.js";
// import {teacherLeave, teacherLeavePost} from "../controllers/teacherLeave.js"
const router=express.Router();

router.get('/dashboard',checkValidation,showDashboard);
router.post('/dashboard/teacherdata',getTeacherData);
router.post('/dashboard/savetimetable',saveLectureData)
router.get('/dashboard/getleavedata',getLeaveData);
router.post('/dashboard/approve',approveLeave);
router.post('/dashboard/reject',rejectLeave);
router.get('/dashboard/:email',getLecturesOfEmail);

export default router;