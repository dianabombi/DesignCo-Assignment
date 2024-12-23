import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/login";
import Homepage from "./components/homepage";

function App() {
  return (
    <div>  
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
          {/* <Route path="/register" element={<Register/>}/> */}
          {/* <Route path="/homepage" element={<Homepage />}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
