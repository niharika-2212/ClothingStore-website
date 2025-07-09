import React from "react";
import "../assets/styles/Navbar.css";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import Navbar2 from "./Navbar2";
import { useNavigate } from "react-router-dom";
function Navbar(){
    const navigate = useNavigate();
    return(
        <div className="navbar">
            <div className="logo">Logo</div>
            <Navbar2/>
            <div className="navbar-right">
                <FaRegUserCircle className="navbar-icon"/>
                <IoCart className="navbar-icon" onClick={()=>{navigate("/cart")}}/>
                <div className="button" onClick={()=>{navigate("/login")}}>login</div>
            </div>
        </div>
    )
}

export default Navbar;