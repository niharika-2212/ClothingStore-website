import React from "react";
import image from "../assets/about.png";
import { useNavigate } from "react-router-dom";
function Hero() {
    const navigate = useNavigate();
    return (
        <div className="hero">
            <div className="hero-content">
                <h1>Welcome to Our Store</h1>
                <p>Discover the best products at unbeatable prices!</p>
                <div className="button hero-cta" onClick={()=>{navigate("/shop")}}>Shop Now</div>
            </div>
            <img src={image} alt="hero image" className="hero-image"/>
        </div>
    )

}

export default Hero;