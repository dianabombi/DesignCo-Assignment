import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Blog() {
  const [post, setPost] = useState({
    title: "",
    date: "",
    category: "",
    content: "",
  });

  const [editIndex, setEditIndex] = useState(null);
  const [submittedPosts, setSubmittedPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate(); 
  

  // Fetch posts from the backend on load
  useEffect(() => {
    const fetchPosts = async () => {
      try {
      
        const response = await axios.get("https://designco-assignment.onrender.com/blog");
        setSubmittedPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (post.title && post.date && post.content && post.category) {
      try {
        await axios.post("https://designco-assignment.onrender.com/blog", post);
        const response = await axios.get("https://designco-assignment.onrender.com/blog");
        setSubmittedPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error("Error creating post:", error);
        alert("Failed to save post to database.");
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleEdit = (index) => {
    const selectedPost = { ...submittedPosts[index] };
    setPost(selectedPost);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post? This action cannot be undone."
    );

    if (!confirmDelete) {
      return;
    }
    try {
      const postId = submittedPosts[index]._id;
      if (!postId) throw new Error("Post ID is missing.");

      console.log("Deleting post with ID:", postId);
      await axios.delete(`https://designco-assignment.onrender.com/blog/${postId}`);

      const updatedPosts = submittedPosts.filter((_, i) => i !== index);
      setSubmittedPosts(updatedPosts);
      setFilteredPosts(updatedPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  };

  const handleUpdate = async () => {
    try {
      const postId = submittedPosts[editIndex]._id;
   
      const response = await axios.put(
        `https://designco-assignment.onrender.com/blog/${postId}`,
        post
      );

  const updatedPosts = [...submittedPosts];
    updatedPosts[editIndex] = {...post, _id: postId};
    
    setSubmittedPosts(updatedPosts);
    setFilteredPosts(updatedPosts);
      setPost({
        title: "",
        date: "",
        category: "",
        content: "",
      });
      setEditIndex(null);
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post.");
    }
  };

  const handleFilterChange = (e) => {
    const selectedCategory = e.target.value;
    setFilterCategory(selectedCategory);

    if (selectedCategory === "") {
      setFilteredPosts(submittedPosts); // Show all posts

    } else {
      const filtered = submittedPosts.filter(
        (post) => post.category === selectedCategory
      );
      setFilteredPosts(filtered);
    }
  };

  const handleReadMore = (_id) => {
    if (_id) {
      console.log("Navigating to post with ID:", _id);
      navigate(`/dashboard/blog/${_id}`);
    } else {
      console.error("Post ID is undefined. Cannot navigate.");
    }
  };

  return (
    <div className="main-content">
      <h1>{editIndex === null ? "Create a Post" : "Edit Post"}</h1>

      <div>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={post.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="date"
          placeholder="date"
          value={post.date}
          onChange={handleChange}
        />

        <select name="category" value={post.category} onChange={handleChange}>
          <option value="" disabled>
            Select Category
          </option>
          <option value="event">Event</option>
          <option value="discussion">Discussion</option>
          <option value="provide help">Provide Help</option>
          <option value="request help">Request Help</option>
          <option value="sports">Sports</option>
          <option value="creative event">Creative Event</option>
          <option value="volunteering">Volunteering</option>
        </select>

        <textarea
          type="text"
          name="content"
          placeholder="content"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
        />
        {editIndex === null ? (
          <button onClick={handleSubmit}>CREATE A POST</button>
        ) : (
          <button onClick={handleUpdate}>UPDATE POST</button>
        )}
      </div>

      <div>
        <h2>Filter by Category</h2>
        <select value={filterCategory} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="event">Event</option>
          <option value="discussion">Discussion</option>
          <option value="provide help">Provide Help</option>
          <option value="request help">Request Help</option>
          <option value="sports">Sports</option>
          <option value="creative event">Creative Event</option>
          <option value="volunteering">Volunteering</option>
        </select>
      </div>

      {filteredPosts.length > 0 ? (

        <div className="posts-container">

          <h2>TRENDING</h2>

          {filteredPosts.map((p, index) => (
            <div key={p._id} className="post-card">
              <h3>{p.title}</h3>
              <p>
                <strong>Date:</strong> {p.date}
              </p>
              <p>
                <strong>Content:</strong> {p.content}
              </p>
              <p>
                <strong>Category:</strong> {p.category}
              </p>

              <div className="post-actions">
              <button onClick={() => handleReadMore(p._id)}>
                    Read Full Article
              </button>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
              <hr />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts found for the selected category.</p>
      )}
    </div>
  );
}

export default Blog;
