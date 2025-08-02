import express from "express";
import { teacherPage, teacherLeave }  from "../controllers/teacher.js";
import uploadsMiddleware from "../middlewares/multermiddleware.js";
import uploadsPic from "../controllers/uploadsPic.js"
const router=express.Router();

router.get("/page",teacherPage);
router.post("/page/leave",teacherLeave)
router.post("/page/uploads",uploadsMiddleware.single("filedata"),uploadsPic)
export default router;