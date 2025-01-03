import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ArticleDetail() {
  const params = useParams();
  const _id = params._id;

  const [blog, setBlog] = useState({
    title: "",
    date: "",
    category: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/blog/${_id}`);
        if (!response.ok) {
          throw new Error(`Something went wrong`, response.status);
        }
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [_id]);

  if (loading) {
    return <p>Loading article...</p>
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>
        <strong>Date:</strong> {blog.date}
      </p>
      <p>
        <strong>Category:</strong> {blog.category}
      </p>
      <p>
        <strong>Content:</strong> {blog.content}
      </p>
    </div>
  );
}

export default ArticleDetail;
