import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Login.css";
import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { useUser } from "../context/UserContext";

function Register() {
  const navigate = useNavigate();
  const { setUserAndToken } = useUser(); // ✅ pull from context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // ✅ Firebase signup
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      const token = await firebaseUser.getIdToken();

      // ✅ Backend registration
      const res = await axios.post(
        "http://localhost:5000/auth/register",
        { name: "" }, // optionally collect name input later
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dbUser = res.data.user;
      setUserAndToken(dbUser, token); // ✅ store both user + token

      navigate("/edit");
    } catch (err) {
      console.error("Registration error:", err);
      alert("Error registering user.");
    }
  };
  return (
    <div className="register">
      <form className="login-form" onSubmit={handleRegister}>
        <h1>Register</h1>
        <div className="login-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="login-group">
          <label>Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter password again"
            required
          />
        </div>
        <button type="submit" className="button">
          Register
        </button>
        <div className="navigate">
          Already have an account?{" "}
          <span
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;
