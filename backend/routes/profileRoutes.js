const express = require("express");
const {viewProfile, editProfile} = require("../controllers/profileControllers");
const checkUpdateRequest = require("../middlewares/validateEditprofile");
const router = express.Router(); 

router.get("/:roll", viewProfile);
router.patch("/", checkUpdateRequest, editProfile);


module.exports = router;