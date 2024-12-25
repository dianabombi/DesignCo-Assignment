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

app.get('/', (req, res) => {
  res.send('Hello World!')
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