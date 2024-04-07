import "./App.css";
import  Login  from "./pages/login/Login";
import  Signup  from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
  <div className="p-4 h-screen flex items-center justify-center">
  <Router>
    <Routes>
    <Route path="/" element={<Signup/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/else" element={<Home />} />

    </Routes>
 </Router>
  </div>
  );
}

export default App;