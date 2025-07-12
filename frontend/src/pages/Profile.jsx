import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/styles/Profile.css"
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
            <div className="profile-header">
                <h1>User details</h1>
                <div className="button edit-button" onClick={() => { navigate("/edit") }}>Edit</div>
            </div>
            <div className="profile-details">
                <table className="details">
                    <tbody className="detail">
                        <tr className="row">
                            <td>Name:</td>
                            <td>{profile.name || "Not set"}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{profile.email}</td>
                        </tr>
                        <tr>
                            <td>Phone: </td>
                            <td>{profile.phone || "Not set"}</td>
                        </tr>
                        <tr>
                            <td>Address: </td>
                            <td>{profile.address || "Not set"}</td>
                        </tr>
                        <tr>
                            <td>City: </td>
                            <td>{profile.city || "Not set"}</td>
                        </tr>
                        <tr>
                            <td>State: </td>
                            <td>{profile.state || "Not set"}</td>
                        </tr>
                        <tr>
                            <td>Country: </td>
                            <td>{profile.country || "Not set"}</td>
                        </tr>
                        <tr>
                            <td>Pincode: </td>
                            <td>{profile.pincode || "Not set"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Profile;
