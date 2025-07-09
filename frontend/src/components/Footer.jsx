import React from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram,FaLinkedin } from "react-icons/fa";
import "../assets/styles/Footer.css";
function Footer(){
    const navigate = useNavigate();
    return(
        <div className="footer">
            <div className="footer-links">
                <div className="footer-heading">Quick links</div>
                <div onClick={()=>{navigate("/")}}>Home</div>
                <div onClick={()=>{navigate("/shop")}}>Shop</div>
                <div onClick={()=>{navigate("/about")}}>About</div>
                <div onClick={()=>{navigate("/contact")}}>Contact</div>
            </div>
            <div className="footer-links"> 
                <div className="footer-heading">Socials</div>
                <div>Email: abc@xyz.com</div>
                <div>Contact: +91 9876543210</div>
                <div className="footer-icons">
                    <FaInstagram className="footer-icon"/>
                    <FaLinkedin className="footer-icon"/>
                </div>
            </div>
            <div className="footer-links"> 
                <div className="footer-heading">Location</div>
                <div>Address, city</div> 
                <div>State</div>
                <div>pincode</div>
            </div>
        </div>
    )
}

export default Footer;