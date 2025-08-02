// controllers/login.js
import path from "path";
import { fileURLToPath } from "url";
import { readFileCustom } from "./fileOperation.js";
import {user} from "../models/userSchema.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Show login page
export function login(req, res) {
  return res.sendFile(path.join(__dirname, "../views/login.html"));
}

// Handle login form
export async function identify(req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await user.findOne({ email });

    console.log("existing user:", existingUser);
    console.log("Logged-in user role:", existingUser.role);
    console.log("Entered password:", password);
console.log("Password in DB:", existingUser.password);

    if (!existingUser) {
      return res.status(400).send("User not found");
    }

    if (existingUser.password.toString() !== password) {
      return res.status(401).send("Incorrect password");
    }

    // Save session
    req.session.isAuthenticated = true;
    req.session.email = existingUser.email;
    req.session.role = existingUser.role;
    req.session.save();

    

    // Redirect based on user role from DB
    if (existingUser.role === "admin") {
      return res.redirect("/admin/dashboard");
    } else if (existingUser.role === "teacher") {
      return res.redirect("/teacher/page");
    } else {
      return res.status(403).send("Unauthorized role");
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Internal Server Error");
  }
}

