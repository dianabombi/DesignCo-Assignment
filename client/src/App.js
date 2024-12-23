import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/Dashboard/dashboard";

function App() {
  return (
    <div>  
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
          {/* <Route path="/register" element={<Register/>}/> */}
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
