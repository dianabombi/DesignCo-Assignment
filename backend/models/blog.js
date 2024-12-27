const mongoose = require ("mongoose");

const blogSchema = new mongoose.Schema({
    title: {type: String},
    date: { type: String},
    content: {type: String},
    category: {type: String, enum: ["event", "discussion", "provide help", "request help", "sports", "creative event", "volunteering"],},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
  });

  const Blog = mongoose.model('Blog', blogSchema); 
 
  module.exports = Blog;