import React from "react";
import "../assets/styles/Navbar.css"; 
import { useNavigate } from "react-router-dom";
function Navbar2() {
    const navigate = useNavigate();
    return (
        <div className="navbar2">
            <div className="navbar2-link" onClick={()=>{navigate("/")}}>Home</div>
            <div className="navbar2-link" onClick={()=>{navigate("/shop")}}>Shop</div>
            <div className="navbar2-link" onClick={()=>{navigate("/about")}}>About</div>
            <div className="navbar2-link" onClick={()=>{navigate("/contact")}}>Contact</div>
        </div>
    )
}

export default Navbar2;