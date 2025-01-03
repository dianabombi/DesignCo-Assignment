import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/Dashboard/dashboard";
import Blog from "./components/Dashboard/blog";
import Homepage from "./components/homepage";
import ArticleDetail from "./components/articleDetail";
import ProtectedRoute from "./components/protectedRoutes";
import Trending from "./components/Dashboard/trending";

import './index.css';

function App() {
  return (
    <div>  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register/>}/>

        
          <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
          

          <Route 
            path="/blog" 
            element={
                <ProtectedRoute>
                  <Blog />
                </ProtectedRoute>
              } />

          <Route
            path="/dashboard/me"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/dashboard/blog/:id" element={<ArticleDetail />} />
          <Route path="/trending" element={<Trending />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
