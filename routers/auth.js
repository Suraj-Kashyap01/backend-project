import {showSignupPage,handleSignup,login,identify, logout} from "../controllers/auth.js"

import express from "express"
const router = express.Router()

router.get('/login',login)
router.post('/login/identify',identify)
router.get('/signup',showSignupPage);
router.post('/signup/',handleSignup);
router.get('/logout',logout)

export default router