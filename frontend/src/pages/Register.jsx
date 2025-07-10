import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Login.css";
import { auth } from "../firebase.js"; // Importing auth from firebase.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      alert("Passwords do not match");
      navigate("/register");
    } else {
      try {
        // create in firebaes
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        // console.log("User registered:", user);
        const token = await user.getIdToken();
        // Send token to backend to register user in MongoDB
        const response = await axios.post(
          "http://localhost:5000/auth/register",     // URL
          { name: "" },                              // Body
          {
            headers: {
              Authorization: `Bearer ${token}`,      // ✅ must be in 3rd arg
            },
          }
        );

        navigate("/");
      } catch (error) {
        console.error("Firebase registration error:", error);
        alert(error.message);
      }
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
