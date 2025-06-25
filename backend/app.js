const express = require("express");
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const authRouter = require("./routes/authRoutes");

connectDB();


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);




app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});