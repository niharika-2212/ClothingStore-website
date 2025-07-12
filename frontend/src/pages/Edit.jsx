import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/styles/Edit.css";
import { useNavigate } from "react-router-dom";
function Edit() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pincode, setPincode] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return navigate("/login");

            try {
                const res = await axios.get("http://localhost:5000/auth/login", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = res.data.user;
                setName(data.name || "");
                setPhone(data.phone || "");
                setAddress(data.address || "");
                setCity(data.city || "");
                setState(data.state || "");
                setCountry(data.country || "");
                setPincode(data.pincode || "");
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        };

        fetchUser();
    }, []);
    const handleEdit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        try {
            const res = await axios.put(
                "http://localhost:5000/auth/update",
                {
                    name,
                    phone,
                    address,
                    city,
                    state,
                    country,
                    pincode,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Profile updated successfully!");
            navigate("/profile");
        } catch (err) {
            console.error("Edit error:", err);
            alert("Update failed");
        }
    };
    return (
        <div className="edit">
            <form onSubmit={handleEdit}>
                <h2>Edit Profile</h2>
                {/* <div className="main-edit"> */}
                    <div className="edit-detail">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className="name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="edit-detail">
                        <label>Phone:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className="phone"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="edit-detail">
                        <label>Address:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className="address"
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="edit-detail">
                        <label>City:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className="city"
                            value={city}
                            onChange={(e) => {
                                setCity(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="edit-detail">
                        <label>State:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className="state"
                            value={state}
                            onChange={(e) => {
                                setState(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="edit-detail">
                        <label>Country:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className="country"
                            value={country}
                            onChange={(e) => {
                                setCountry(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="edit-detail">
                        <label>Pincode:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className="pincode"
                            value={pincode}
                            onChange={(e) => {
                                setPincode(e.target.value);
                            }}
                            required
                        />
                    </div>
                {/* </div> */}
                <button type="submit" className="button">
                    Save changes
                </button>
            </form>
        </div>
    );
}

export default Edit;
