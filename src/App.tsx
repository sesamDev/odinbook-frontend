import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import { CurrentUser } from "./types";
import Friends from "./pages/Friends";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import React from "react";
import Register from "./pages/Register";
import { firebaseConfig } from "./config/firebase";
import { getCurrentUser } from "./auth";
import { initializeApp } from "firebase/app";

export const fbColor = "rgb(57 117 234)";
export const firebase = initializeApp(firebaseConfig);

export interface UserProp {
  readonly user: CurrentUser;
}

export interface SetUserStateProp {
  setUser: CallableFunction;
  setIsLoading: CallableFunction;
}

function App() {
  const [user, setUser] = useState<CurrentUser>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCurrentUser().then((user) => setUser(user));
  }, []);

  return (
    <BrowserRouter>
      {user ? <Navbar setUser={setUser} setIsLoading={setIsLoading} /> : null}
      {isLoading ? <Loading /> : <></>}
      <Routes>
        <Route path="/" element={user ? <Home user={user} setIsLoading={setIsLoading} /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login setUser={setUser} setIsLoading={setIsLoading} />}
        />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
        <Route path="/friends" element={user ? <Friends user={user} /> : <Navigate to="/login" />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
