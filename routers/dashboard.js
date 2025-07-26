 import express from "express"
 import { showDashboard, timetable } from "../controllers/dashboard.js";
import { checkValidation, isAdmin } from "../middlewares/session.js";
import {addTimeTable,addData} from "../controllers/addTimeTable.js";
const router=express.Router();

router.get('/dashboard',checkValidation,isAdmin,showDashboard);
router.post('/timetable',timetable);
router.get('/addtimetable',addTimeTable);
router.post('/savetimetable',addData)

export default router;