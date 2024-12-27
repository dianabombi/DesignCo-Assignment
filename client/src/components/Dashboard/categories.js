import React, { useState, useEffect } from "react";

function Categories() {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const query = selectedCategory ? `?category=${category}` : "";
        const response = await fetch(`/blogs${query}`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [selectedCategory]);

  const categories = [
    "event", 
    "discussion", 
    "provide help", 
    "request help", 
    "sports", 
    "creative event", 
    "volunteering"
  ];

  const handleFilter = () => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <h1>Blog Posts</h1>

    <div>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
      <button onClick={handleFilter}>Filter</button>
    </div>

      {/* Render Blogs */}
      <div>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id}>
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>

              <p>
                <strong>Category:</strong> {blog.category}
              </p>

            </div>
          ))
        ) : (
          <p>No blogs found for the selected category.</p>
        )}
      </div>
    </div>
  );
}

export default Categories;
