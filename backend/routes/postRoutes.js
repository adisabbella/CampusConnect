const express = require('express');
const router = express.Router();
const {createPost,deletePost} = require('../controllers/postControllers');
const {PostValidation} = require('../middlewares/validatePost');

router.post('/create', PostValidation, createPost);
router.delete('/delete/:id', deletePost);

module.exports = router;
