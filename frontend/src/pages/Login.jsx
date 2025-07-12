import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import "../assets/styles/Login.css";
import { useUser } from "../context/UserContext";

function Login() {
  const { setUserAndToken } = useUser(); // ✅ updated
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Firebase login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      const token = await firebaseUser.getIdToken();

      // Backend login (fetch full user from DB)
      const res = await axios.get("http://localhost:5000/auth/login", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dbUser = res.data.user;

      // ✅ Save user + token in context and localStorage
      setUserAndToken(dbUser, token);

      // ✅ Redirect to home
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password, or user not registered.");
    }
  };
  return (
    <div className="login">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="login-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="login-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="button">
          Login
        </button>
        <div className="navigate">
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
