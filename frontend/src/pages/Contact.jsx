import React from "react";
import "../assets/styles/Contact.css";

function Contact() {
    return (
        <div className="contact">
            <h1>Contact Us</h1>
            <div className="contact-container">
                <div className="contact-info">
                    <div className="location-details">
                        <h2 className="contact-subheading">Location</h2>
                        <div>123 some address, Bangalore, India, 123456</div>
                    </div>
                    <div className="location-details">
                        <h2 className="contact-subheading">Contact</h2>
                        <div>Email: abc@xyz.com</div>
                        <div>Phone: +91 9876543210</div>
                    </div>
                </div>
                <div>
                    <form className="contact-form">
                        <h2 className="contact-subheading">Send us a message</h2>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" name="name" required />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label>Message:</label>
                            <textarea name="message" required></textarea>
                        </div>
                        <button type="submit" className="button">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact;