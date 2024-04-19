import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Signup from "./pages/signup/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
