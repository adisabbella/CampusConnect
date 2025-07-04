const express = require('express');
const router = express.Router();
const {createPost, viewPost, deletePost, editPost} = require('../controllers/postControllers');
const {PostValidation} = require('../middlewares/validatePost');
const checkQuery = require('../middlewares/validateQuery');
const checkUpdateRequest = require("../middlewares/validateUpdate");

router.post('/create', PostValidation, createPost);
router.get('/view', checkQuery, viewPost);
router.delete('/delete/:id', deletePost);
router.patch('/edit/:id', checkUpdateRequest, editPost);

module.exports = router;
