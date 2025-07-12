import React, { useState, useEffect } from "react";
import { auth } from "../firebase.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Profile() {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await axios.get("http://localhost:5000/auth/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(res.data.user);
            } catch (err) {
                console.error("Error fetching profile:", err);
                navigate("/login"); // optional fallback on error
            }
        };

        fetchProfile();
    }, [navigate]);

    if (!profile) return <div>Loading...</div>;
    return (
        <div className="profile">
            <h1>User details</h1>
            <div className="button">Edit</div>
            <div className="profile-details">
                <div>Name: {profile.name || "Not set"}</div>
                <div>Email: {profile.email} </div>
                <div>Phone: {profile.phone || "Not set"}</div>
                <div>Address: {profile.address || "Not set"}</div>
                <div>City: {profile.city || "Not set"}</div>
                <div>State: {profile.state || "Not set"}</div>
                <div>Country: {profile.country || "Not set"}</div>
                <div>Pincode: {profile.pincode || "Not set"}</div>
            </div>
        </div>
    )
}

export default Profile;
