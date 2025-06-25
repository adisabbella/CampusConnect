const express = require("express");
const {signup, signin} = require('../controllers/authControllers');
const checkSignup = require('../middlewares/validateSignup');
const checkSignin = require("../middlewares/validateSignin"); 

const router = express.Router();

router.post('/signup', checkSignup, signup);
router.post('/signin', checkSignin, signin);

module.exports = router;