import React, { useState, useEffect } from "react";
import axios from "axios";

function Blog() {
  const [post, setPost] = useState({
    title: "",
    date: "",
    content: ""
  });

  const [editIndex, setEditIndex] = useState(null); 
  const [submittedPosts, setSubmittedPosts] = useState([]);

  // Fetch posts from the backend on load
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/blog");
        setSubmittedPosts(response.data);
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

  const handleSubmit = async () => {
    if (post.title && post.date && post.content) {
      try {
        const response = await axios.post("http://localhost:8000/blog", post);
        setSubmittedPosts([...submittedPosts, response.data]);
        setPost({
            title: "",
            date: "",
            content: ""
        }); 
      } catch (error) {
        console.error("Error creating post:", error);
        alert("Failed to save post to database.");
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleEdit = (index) => {
    setPost(submittedPosts[index]);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    try {
      const postId = submittedPosts[index]._id;
      if (!postId) throw new Error("Post ID is missing.");
  
      console.log("Deleting post with ID:", postId);  
      await axios.delete(`http://localhost:8000/blog/${postId}`);
      
      const updatedPosts = submittedPosts.filter((_, i) => i !== index);
      setSubmittedPosts(updatedPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  };
  
  const handleUpdate = async () => {
    try {
      const postId = submittedPosts[editIndex]._id;
      const response = await axios.put(`http://localhost:8000/blog/${postId}`, post);

      const updatedPosts = [...submittedPosts];
      updatedPosts[editIndex] = response.data;
      setSubmittedPosts(updatedPosts);

      setPost({
        title: "",
        date: "",
        content: ""
      });
      setEditIndex(null);
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post.");
    }
  };

  return (
    <div>
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
        <textarea
          name="content"
          placeholder="content"
          value={post.content}
          onChange={handleChange}
        />
        {/* <input
          type="text"
          name="author"
          placeholder="author"
          value={post.author}
          onChange={handleChange}
        /> */}
        {editIndex === null ? (
          <button onClick={handleSubmit}>CREATE A POST</button>
        ) : (
          <button onClick={handleUpdate}>UPDATE POST</button>
        )}
      </div>

      {submittedPosts.length > 0 && (
        <div>
          <h2>Trending</h2>
          {submittedPosts.map((p, index) => (
            <div key={index}>
              <h3>{p.title}</h3>
              <p>
                <strong>Date:</strong> {p.date}
              </p>
              <p>
                <strong>Content:</strong> {p.content}
              </p>
            
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;
