const express = require('express');
const router = express.Router();
const {createPost, viewPost, deletePost, editPost} = require('../controllers/postControllers');
const {PostValidation} = require('../middlewares/validatePost');
const checkQuery = require('../middlewares/validateQuery');
const checkUpdateRequest = require("../middlewares/validateUpdate");

router.post('/', PostValidation, createPost);
router.get('/', checkQuery, viewPost);
router.delete('/:id', deletePost);
router.patch('/:id', checkUpdateRequest, editPost);

module.exports = router;
