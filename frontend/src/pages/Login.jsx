import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import "../assets/styles/Login.css";
import { useState } from "react";
import { useUser } from "../context/UserContext";
function Login() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = useState("");
  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      const res = await axios.get("http://localhost:5000/auth/login", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data.user);

      // console.log("Login success", res.data);
      navigate("/"); // redirect to home page
    } catch (error) {
      console.error("Firebase login error:", error);
      setError("Invalid credentials or user not registered.");
    }
  }
  return (
    <div className="login">
      <form className="login-form" onSubmit={handlelogin}>
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
