import React, {useState} from 'react';


function Blog() {
    const [post, setPost] = useState ({
        title: '',
        date: '',
        content: '',
        author: '',
    });

    const [submittedPost, setSubmittedPost] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPost ({...post, [name]:value});
    };

    const handleSubmit = () => {
        if (post.title && post.date && post.content && post.author) {
            setSubmittedPost(post);
            console.log('Post created:', post);
            setPost({
                title: '',
                date: '',
                content: '',
                author: '',
                });
            } else {
                alert('Please fill out all fields.');
              }
            };

  return (
    <div>
      <h1>Create a Post</h1>

      <div>
        <input 
            type="text" 
            name ="title"
            placeholder='title'
            value = {post.title}
            onChange = {handleChange}
            />

        <input 
            type="text" 
            name ="date"
            placeholder='date'
            value = {post.date}
            onChange = {handleChange}
            />

        <textarea 
            type="text" 
            name ="content"
            placeholder='content'
            value = {post.content}
            onChange = {handleChange}
            />

        <input 
            type="text" 
            name ="author"
            placeholder='author'
            value = {post.author}
            onChange = {handleChange}
            />

      <button 
            onClick={handleSubmit}>CREATE A POST</button>
    </div>

{/* conditionally rendered, when a post exists */}
    {submittedPost && (
    <div >
        <h2>Post Preview</h2>
        <p>
            <strong>Title:</strong> {submittedPost.title}
        </p>
        <p>
            <strong>Date:</strong> {submittedPost.date}
        </p>
        <p>
            <strong>Content:</strong> {submittedPost.content}
        </p>
        <p>
            <strong>Author:</strong> {submittedPost.author}
        </p>
    </div>
  )}
  </div>

  );
}

export default Blog;
