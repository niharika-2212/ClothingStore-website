import React from "react";
import "../assets/styles/Navbar.css";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import Navbar2 from "./Navbar2";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";


function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useUser();
    const handleLogout = async () => {
        try {
            await signOut(auth); // Firebase logout
            logout();            // Clear from context and localStorage
            navigate("/login");  // Redirect to login
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };
    return (
        <div className="navbar">
            <div className="logo">Logo</div>
            <Navbar2 />
            <div className="navbar-right">
                <FaRegUserCircle className="navbar-icon" onClick={()=> {navigate("/profile")}} />
                <IoCart className="navbar-icon" onClick={() => { navigate("/cart") }} />
                {user ? (
                    <div className="button" onClick={handleLogout}>Logout</div>
                ) : (
                    <div className="button" onClick={() => navigate("/login")}>Login</div>
                )}
            </div>
        </div>
    )
}

export default Navbar;