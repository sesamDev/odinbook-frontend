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
import { getCurrentUser } from "./auth";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      {getCurrentUser() ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={getCurrentUser() ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={getCurrentUser() ? <Navigate to="/" /> : <Login />} />
        <Route path="/profile" element={getCurrentUser() ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/friends" element={getCurrentUser() ? <Friends /> : <Navigate to="/login" />} />
        <Route path="/register" element={getCurrentUser() ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
