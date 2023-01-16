import "./index.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Friends from "./pages/Friends";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import React from "react";
import ReactDOM from "react-dom/client";
import Register from "./pages/Register";

// TEMPORARY!!!!!!!!!
const user = {
  authanticated: false,
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      {user.authanticated ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={user.authanticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={user.authanticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/profile" element={user.authanticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/friends" element={user.authanticated ? <Friends /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
