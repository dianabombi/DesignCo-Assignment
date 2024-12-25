const Blog = require("../models/blog");

const getAllBlogs = async (req, res) => {
  try {
    let blogs = await Blog.find();
    return res.send(blogs);
  } catch (error) {
    return res.status(500).send({ msg: "Blogs cannot be found", error: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    let blog = await Blog.findOne({ _id: req.params.id });
    if (!blog) {
      return res.status(404).send({ msg: "Blog not found" });
    }
    return res.send(blog);
  } catch (error) {
    return res.status(500).send({ msg: "Blog cannot be found", error: error.message });
  }
};

const createBlog = async (req, res) => {
  try {
    let newBlog = req.body;
    console.log("Data received:", newBlog);
    let createdBlog = await Blog.create(newBlog);
    console.log("Blog created:", createdBlog);
    return res.send({ msg: "Blog has been created successfully", createdBlog });
  } catch (error) {
    return res.status(500).send({ msg: "Blog cannot be created", error: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    let newValue = req.body;
    let id = req.params.id;

    let isBlogFound = await Blog.findOne({ _id: id });
    if (!isBlogFound) {
      return res.status(404).send({ msg: "Blog not found" });
    }

    let updatedBlog = await Blog.findByIdAndUpdate(id, newValue, { new: true });
    return res.send({ msg: "Blog has been updated successfully.", updatedBlog });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Blog cannot be updated", error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    let deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).send({ msg: "Blog not found" });
    }
    return res.send({ msg: "Blog has been deleted successfully.", deletedBlog });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Blog cannot be deleted", error: error.message });
  }
};

module.exports = { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
