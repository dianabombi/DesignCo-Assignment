const Blog = require ("../models/blog");

const getAllBlogs = async (req, res) => {
    try {
        let blogs = await Blog.find();
        return res.send(blogs);
    } catch (error) {
        return res.status(500).send({msg:"Blogs can not be found", error})
    }    
};

const getBlogById = async (req, res) => {
    try {
        let blog = await Blog.findOne({_id: req.params.id});
        return res.send(blog);
    } catch (error) {
        return res.status(500).send({msg:"Blog can not be found", error})
    }
};

const createBlog = async (req, res) => {
    try {
        let newBlog = req.body;
        await Blog.create (newBlog);
        return res.send({msg: "Blog has been created successfully"});
    } catch (error) {
        return res.status(500).send({msg:"Blog can not be created", error})
    }
};

const updateBlog = async (req, res) => {
    try {
        let newValue = req.body;
        let id = req.params.id;

        let isBlogFound = await Blog.findOne({_id: id});
        if (!isBlogFound) return res.send({msg: "Blog is not found."});

        let updatedBlog = await Blog.findByIdAndUpdate (id, newValue);
        return res.send({msg: "User has been updated successfully.", updatedBlog});
    } catch (error) {
        console.log(error);
        return res.status(500).send({msg:"Blog can not be shown", error})
        }
    };

const deleteBlog = async (req, res) => {
    try {
        let id = req.params.id;
        
        let isBlogFound = await Blog.findOne({_id: id});
        if (!isBlogFound) return res.send({msg: "User is not found."});

        let deletedBlog = await Blog.findByIdAndDelete (id);
        return res.send({msg: "Blog has been deleted successfully.", deletedBlog});
    } catch (error) {
        console.log(error);
        return res.status(500).send({msg:"Blog can not be deleted", error})
        }
    };


module.exports = {getAllBlogs, getBlogById, updateBlog, createBlog, deleteBlog}