
import express from 'express';
import signupRouter from './signup.js';
import loginRouter from  './login.js'
import  showDashboard  from './dashboard.js';
import teacherPage from './teacher.js';
import teacherRoute from './teacherLeave.js'

import { checkValidation, isAdmin, isTeacher } from '../middlewares/session.js';
const router= express.Router();

router.use('/signup',signupRouter);
router.use('/login',loginRouter)
router.use('/admin',showDashboard)
router.use('/teacherpage',teacherRoute)
router.use('/teacher',checkValidation,isTeacher,teacherPage);
// router.use('/addtimetable',addTimeTable);
router.get('/',async (req,res) => {
    if(req.session.isAuthenticated){
        res.redirect('/admin/dasboard')
    }else{
        res.redirect('/login');
    }
})
export default router;