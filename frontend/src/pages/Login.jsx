import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Login.css";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handlelogin= async (e) => {
    
  }
  return (
    <div className="login">
      <form className="login-form">
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
