const mongoose = require ("mongoose");

const blogSchema = new mongoose.Schema({
    title: {type: String},
    date: { type: String},
    content: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
  });

  const Blog = mongoose.model('Blog', blogSchema); 
 
  module.exports = Blog;