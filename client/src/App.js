import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/Dashboard/dashboard";
import Blog from "./components/Dashboard/blog";
import Homepage from "./components/homepage";
import ArticleDetail from "./components/articleDetail";

import './index.css';

function App() {
  return (
    <div>  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/blog" element={<Blog />}/>
          <Route path="/dashboard/blog/:_id" element={<ArticleDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
