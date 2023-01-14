import "../styles/Login.css";

import React from "react";

function Login() {
  return (
    <div className="app-login">
      <h1>odinbook</h1>
      <form action="/login" method="POST" className="login-form">
        <div className="login-input">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="login-input">
          <label htmlFor="password">Password</label>
          <input type="password" name="email" required minLength={6} />
        </div>
        <button>Login</button>
        <div className="app-line"></div>
      </form>
      <div className="login-facebook">
        Or sign in with facebook
        <svg height="56px" width="56px" viewBox="0 0 128 128">
          <path
            fill="rgb(57 117 234)"
            d="M116.42 5.07H11.58a6.5 6.5 0 00-6.5 6.5v104.85a6.5 6.5 0 006.5 6.5H68V77.29H52.66V59.5H68V46.38c0-15.22 9.3-23.51 22.88-23.51a126 126 0 0113.72.7v15.91h-9.39c-7.39 0-8.82 3.51-8.82 8.66V59.5H104l-2.29 17.79H86.39v45.64h30a6.51 6.51 0 006.5-6.5V11.58a6.5 6.5 0 00-6.47-6.51z"
          ></path>
        </svg>
      </div>
      <div className="register-account">
        <p>{`Don't have an account?`}</p>
        <a href="/register">Sign-up</a>
      </div>
    </div>
  );
}

export default Login;
