import path from "path";
import { fileURLToPath } from "url";
import { user } from "../models/userSchema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve signup page
export function showSignupPage(req, res) {
  res.sendFile(path.join(__dirname, "../views/signup.html"));
}

//  Handle signup
export async function handleSignup(req, res) {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new user({
      name,
      email,
      password, 
      role,
      lecture: role === "teacher" ? [] : undefined,
    });

    await newUser.save();
    return res.status(200).json({ message: "Signup successful!" });

  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

//  Serve login page
export function login(req, res) {
  res.sendFile(path.join(__dirname, "../views/login.html"));
}

//  Handle login (identify)
export async function identify(req, res) {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // Password match (no hashing for now)
    if (existingUser.password != password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Session handling
    req.session.isAuthenticated = true;
    req.session.email = existingUser.email;
    req.session.role = existingUser.role;
if(existingUser.role!=role){
  return res.status(401).json({ message: "Incorrect role" });
}
  // Redirect based on role
    if (existingUser.role === "admin") {
  return res.status(200).json({ status: "success", role: "admin" });
} else if (existingUser.role == "teacher") {
  return res.status(200).json({ status: "success", role: "teacher" });
} else {
  return res.status(400).json({ message: "Undefined role" });
}
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export function logout(req,res){
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/auth/login');
}