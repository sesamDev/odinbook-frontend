import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CurrentUser } from "./types";
import Friends from "./pages/Friends";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import React from "react";
import Register from "./pages/Register";
import { useState } from "react";

export interface UserProp {
  readonly user: undefined | CurrentUser;
}

export interface SetUserStateProp {
  setUser: CallableFunction;
}

function App() {
  const [user, setUser] = useState();
  console.log(user);

  return (
    <BrowserRouter>
      {user ? <Navbar setUser={setUser} /> : null}
      <Routes>
        <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
        <Route path="/friends" element={user ? <Friends user={user} /> : <Navigate to="/login" />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
