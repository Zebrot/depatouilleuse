const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth');

const blogController = require('../controller/blog');

router.post('/', blogController.createBlog);
router.get('/:id', blogController.getOneBlog);
router.get('/', blogController.getAllBlogs);
router.put('/:id', blogController.modifyBlog);
router.delete('/:id', blogController.deleteBlog);



module.exports = router;