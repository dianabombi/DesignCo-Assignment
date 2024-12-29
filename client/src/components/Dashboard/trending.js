// Trending section

import React from "react";

const Trending = ({ filteredPosts = [], handleReadMore, handleEdit, handleDelete }) => {
  return (
    <div className="posts-container">

      <h2>TRENDING</h2>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((p, index) => (
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
              <button onClick={() => handleReadMore(p._id)}>Read Full Article</button>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
              <hr />
            </div>
          </div>
        ))
      ) : (
        <p>No posts found for the selected category.</p>
      )}
    </div>
  );
};

export default Trending;
