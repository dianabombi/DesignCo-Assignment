const express = require('express');
require('dotenv').config();

const cors = require("cors");
const databaseConnection = require ("./databaseConnection"); 
const app = express();
const port = 8000;

// middleware
app.use(express.json());
app.use(cors()); // because backend and frontend are running on different ports (cross-origin requests)

const blogRouter = require("./routes/blog.routes");
app.use("/blog", blogRouter);

const userRouter = require("./routes/user.routes");
app.use("/users", userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// API endpoint for category filtering
app.get("/blogs", async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};
  try {
    const blogs = await Blog.find(filter);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});


const startServer = async () => {
  try {
    await databaseConnection();  // Wait for the database connection
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.error('Error starting the server:', err.message);
  }
};

startServer();