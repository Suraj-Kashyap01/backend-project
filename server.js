import express from "express"
const app = express();
const port = 9000;
console.log(teacherLeave)
import router from './routers/index.js'
import session from './middlewares/session.js'

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import teacherLeave from "./controllers/teacherLeave.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(session());
app.use("/", router);

app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}/`)
})
