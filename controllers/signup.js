// import path from "path";
// import { fileURLToPath } from "url";
// import {readFileCustom,writeFileCustom} from "./fileOperation.js"
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// import {user} from "../models/userSchema.js"

// Serve signup page
// export function showSignupPage(req, res) {
//   res.sendFile(path.join(__dirname, "../views/signup.html"));
// }
// Handle form POST


// export async function handleSignup(req, res) {
//   const { name, email, password, role } = req.body;
//    const userDb = new user.create({
//     name:name,
//     password:password,
//     email:email,
//     role:role,
//   })

//  await userDb.save();
 
//   if (!users) {
//     return res.status(500).json('internal error');
//   }
//   let flag = 0;

//   for (let i = 0; i < users.length; i++) {
//     if (users[i].email == email) {
//       flag = 1;
//       break;
//     }
//   }

//   if (flag == 1) return res.status(400).json({ err: 'user already exist' })
//   // Add new user

//   if (newuser.role == "teacher") {
//     newuser.lecture = [];
//   }
//   users.push(newuser);

//   // Save back to file
//   console.log(writing)
//   if (!writing) {
//     return res.status(500).json({ err: 'internal error' });
//   }
//   console.log("User saved:", newuser);
//   alert("Signup Successful")
//   res.send("Signup successful!");
  
// };

import path from "path";
import { fileURLToPath } from "url";
import { user } from "../models/userSchema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve signup page
export function showSignupPage(req, res) {
  res.sendFile(path.join(__dirname, "../views/signup.html"));
}

// Handle signup
export async function handleSignup(req, res) {
  const { name, email, password, role } = req.body;

  try {
    const existing = await user.findOne({ email });
    if (existing) {
      return res.status(400).send("User already exists");
    }

    const newUser = new user({
      name,
      email,
      password,
      role,
      lecture: role === "teacher" ? [] : undefined,
    });

    await newUser.save();
    res.send("Signup successful!");
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send("Internal server error");
  }
}



