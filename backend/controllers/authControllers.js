const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const signup = async (req, res) => {
  const userDetails = req.body;
  const mail = userDetails.email;
  const alreadyExists = await User.findOne({mail});
  if (alreadyExists) {
    res.status(409).send("Account with email already exists!");
  }
  else {
    try {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(userDetails.password, salt);
      userDetails.password = hashedPassword;
      const newUser = new User(userDetails);
      await newUser.save();

      return res.status(201).json({ message: 'User created successfully. Please sign in.'});
    }
    catch (error) {
      console.error("SignUp Error: ", error);
      return res.status(500).json({message : "Server error"});
    }
  }
}

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict', 
        maxAge: 3600000 
    });

    return res.status(200).json({ message: 'Signed in successfully.' });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { signup, signin };