const User = require("../models/userModel");

const viewProfile = async (req, res) => {
  const trimmed = req.params.roll.trim();
  const roll = trimmed === "me" ? req.user.rollno : trimmed;
  const email = roll + "@student.nitandhra.ac.in";
  try {
    const {name, department, year, skills, bio, importantLinks} = await User.findOne({email: email});
    res.status(200).json({userDetails : {name, department, year, skills, bio, importantLinks}});
  }
  catch {
    res.status(500).json({ message: "Server Error" });
  }   
}

const editProfile = async (req, res) => {
  try {
    const email = req.user.rollno + "@student.nitandhra.ac.in";
    const toEdit = await User.findOne({ email: email});
    const {year, skills, bio, importantLinks} = req.body;
    if (year) toEdit.year = year;
    if (skills) toEdit.skills = skills;
    if (bio) toEdit.bio = bio;
    if (importantLinks) toEdit.importantLinks = importantLinks;
    await toEdit.save();
    res.status(200).json({ message: "Edited Successfully", profile: toEdit});
  }
  catch {
    res.status(500).json({ message: "Server Error "});
  }
}

module.exports = {viewProfile, editProfile};