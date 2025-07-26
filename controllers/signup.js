import path from "path";
import { fileURLToPath } from "url";
import {readFileCustom,writeFileCustom} from "./fileOperation.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve signup page
export function showSignupPage(req, res) {
  res.sendFile(path.join(__dirname, "../views/signup.html"));
}
// Handle form POST
export async function handleSignup(req, res) {
  const { name, email, password, role } = req.body;
  let newuser = { name, email, password, role };
  console.log("New User:", newuser);
  let users = await readFileCustom(path.join('./', "./data.json"));

  if (!users) {
    return res.status(500).json('internal error');
  }
  let flag = 0;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email) {
      flag = 1;
      break;
    }
  }
  if (flag == 1) return res.status(400).json({ err: 'user already exist' })
  // Add new user
  if (newuser.role == "teacher") {
    newuser.lecture = [];
  }

  users.push(newuser);

  // Save back to file
  const writing = await writeFileCustom(path.join('./', './data.json'), users)
  console.log(writing)
  if (!writing) {
    return res.status(500).json({ err: 'internal error' });
  }
  console.log("User saved:", newuser);
  res.send("Signup successful!");
};

