import React from "react";
import "../assets/styles/About.css"
import image from "../assets/about.png";
function About() {
    return (
        <div className="about">
            <div className="about-1">
                <img src={image} alt="about-image" className="about-image"/>
                <div className="about-1-content">
                    <h1>About us</h1>
                    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia quam nulla tempora. Consectetur officiis incidunt non inventore quibusdam, recusandae dolorem modi neque nam repellendus temporibus, corporis placeat. Animi, quidem facere!</div>
                </div>
            </div>
            <div className="about-2">
                <div className="about-1-content">
                    <h1>About us</h1>
                    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia quam nulla tempora. Consectetur officiis incidunt non inventore quibusdam, recusandae dolorem modi neque nam repellendus temporibus, corporis placeat. Animi, quidem facere!</div>
                </div>
                <img src={image} alt="about-image" className="about-image"/>
            </div>
            <div className="about-3">
                <img src={image} alt="about-image" className="about-image"/>
                <div className="about-1-content">
                    <h1>About us</h1>
                    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia quam nulla tempora. Consectetur officiis incidunt non inventore quibusdam, recusandae dolorem modi neque nam repellendus temporibus, corporis placeat. Animi, quidem facere!</div>
                </div>
            </div>
        </div>
    )
}

export default About;