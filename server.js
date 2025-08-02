import express from "express"
const app = express();
const port = 9000;
import router from './routers/index.js'
import session from './middlewares/session.js'
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(session());
function connectDB() {
    mongoose.connect('mongodb://127.0.0.1:27017/project')
        .then(() => console.log('connect to mongodb:'))
        .catch((err) => console.log('not connect to mongodb: ', err))
};
connectDB();

app.use("/", router);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}/`)
})
