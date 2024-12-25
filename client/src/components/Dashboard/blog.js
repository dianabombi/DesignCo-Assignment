import React, { useState, useEffect } from "react";

function Blog() {
  const [post, setPost] = useState({
    title: "",
    date: "",
    content: "",
    author: "",
  });

  const [submittedPosts, setSubmittedPosts] = useState([]);

  // Load posts from localStorage when the component mounts
  useEffect(() => {
    const savedPosts = localStorage.getItem("submittedPosts");
    if (savedPosts) {
      setSubmittedPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Save posts to localStorage whenever the array changes
  useEffect(() => {
    localStorage.setItem("submittedPosts", JSON.stringify(submittedPosts));
  }, [submittedPosts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = () => {
    if (post.title && post.date && post.content && post.author) {
      setSubmittedPosts([...submittedPosts, post]);
      setPost({
        title: "",
        date: "",
        content: "",
        author: "",
      });
      console.log("Post created:", post);
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div>
      <h1>Create a Post</h1>

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

        <input
          type="text"
          name="author"
          placeholder="author"
          value={post.author}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>CREATE A POST</button>
      </div>

      {/* Display all submitted posts */}
      {submittedPosts.length > 0 && (
        <div>
          <h2>All Posts</h2>
          {submittedPosts.map((p, index) => (
            <div key={index}>
              <h3>{p.title}</h3>
              <p>
                <strong>Date:</strong> {p.date}
              </p>
              <p>
                <strong>Content:</strong> {p.content}
              </p>
              <p>
                <strong>Author:</strong> {p.author}
              </p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;
