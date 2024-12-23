const express = require("express");
const router = express.Router();

const {
    getAllBlogs,
    getBlogById,
    updateBlog,
    createBlog,
    deleteBlog
} = require ("../controllers/blog.controller");

router.get("/blog", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", updateBlog);
router.post("/create", createBlog);
router.delete("/:id", deleteBlog);

module.exports = router;