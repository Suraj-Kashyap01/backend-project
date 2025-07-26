import express from "express";
import { showSignupPage, handleSignup } from "../controllers/signup.js";

const router = express.Router();

router.get("/", showSignupPage);       
router.post("/", handleSignup);       

export default router;
