// routers/teacherLeave.js
import express from "express";
import teacher from "../controllers/teacherLeave.js";

const router = express.Router();

router.get("/leave", teacher.teacherLeave);
// router.post("/", teacher.teacherLeavePost);

export default router;
