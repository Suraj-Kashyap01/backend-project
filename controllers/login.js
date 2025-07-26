// controllers/login.js
import path from "path";
import { fileURLToPath } from "url";
import { readFileCustom } from "./fileOperation.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Show login page
export function login(req, res) {
  return res.sendFile(path.join(__dirname, "../views/login.html"));
}

// Handle login form
export async function identify(req, res) {
  const { email, password, role } = req.body;
  const filePath = path.join(__dirname, "../data/data.json");

 const users = await readFileCustom(path.join('./','./data.json'));

   if(!users){
    return res.status(500).json({err:'internal error'});
   }

    const user = users.filter(u =>
      u.email === email &&
      u.password === password &&
      u.role === role
    )[0];
     
    if (!user || user.length==0) {
      return res.status(404).send("Invalid email, password, or role");
    }

    // Save session
    req.session.isAuthenticated = true;
    req.session.email = user.email;
    req.session.role = user.role;
    req.session.save();

    // Redirect based on role
    if (user.role == "admin") {
        console.log("admin")
      return res.redirect("/admin/dashboard");
    } else if (user.role == "teacher") {
        console.log('teachers')
      return res.redirect("/teacher/page");
    } else {
      return res.status(403).send("Unauthorized role");
    }
  }