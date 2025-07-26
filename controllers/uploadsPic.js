import { readFileCustom } from "./fileOperation.js";
import path from 'path';

export default async function uploadsPic(req, res) {
  try {
    let uploadsFileName = req.file.filename;
    let currentEmail = req.session.email;

    let data = await readFileCustom(path.join('./', 'data.json'));
    if (!data) {
      return res.status(404).json({ msg: "Data not found" });
    }

    let teacher = data.find((item) => item.email == currentEmail);
    if (!teacher) {
      return res.status(404).json({ msg: "Teacher not found" });
    }

    // Add uploaded file name to teacher object
    teacher.uploadsFileName = uploadsFileName;

    // Render page with teacher object
    return res.render("teacher", { teacher });

  } catch (err) {
    console.error("Error while uploading image:", err);
    return res.status(500).send("Server Error");
  }
}
