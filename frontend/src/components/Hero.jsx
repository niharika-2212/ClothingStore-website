import React from "react";
import image from "../assets/about.png";
function Hero() {
    return (
        <div className="hero">
            <div className="hero-content">
                <h1>Welcome to Our Store</h1>
                <p>Discover the best products at unbeatable prices!</p>
                <div className="button hero-cta">Shop Now</div>
            </div>
            <img src={image} alt="hero image" className="hero-image"/>
        </div>
    )

}

export default Hero;