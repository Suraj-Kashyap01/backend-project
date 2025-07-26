import express from "express";
import {login,identify} from "../controllers/login.js";

const router=express.Router();
router.use(express.json());
router.get("/",login);
router.post("/identify",identify);

export default router;

