
import express from 'express';

import auth from "./auth.js"

import  showDashboard  from './dashboard.js';
import teacherPage from './teacher.js';
import { checkValidation, isAdmin, isTeacher } from '../middlewares/session.js';
const router= express.Router();

router.use('/auth',auth);
router.use('/admin',showDashboard)
router.use('/teacher',checkValidation,isTeacher,teacherPage);
router.get('/',async (req,res) => {
    if(req.session.isAuthenticated){
        res.redirect('/admin/dashboard')
    }else{
        res.redirect('/auth/login');
    }
})
export default router;