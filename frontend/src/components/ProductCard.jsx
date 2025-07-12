import React, { useState } from "react";
import image from "../assets/about.png"
import "../assets/styles/ProductCard.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import { auth } from "../firebase.js";
import axios from "axios";
function ProductCard({ product }) {
    const navigate = useNavigate();
    const { user } = useUser();

    const handleCart = async (e) => {
        if (!user) return navigate("/login");
        try {
            const firebaseUser = auth.currentUser;
            if (!firebaseUser) throw new Error("User not authenticated");

            const token = await firebaseUser.getIdToken();
            const res = await axios.post(
                "http://localhost:5000/cart/add",
                {
                    productId: product._id,
                    quantity: 1, // you can make it dynamic 
                    size: "M",   // assume default or selected
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Cart updated:", res.data);
            alert("Item added to cart!");
        } catch (err) {
            console.error("Error adding to cart", err);
            alert("Failed to add to cart.");
        }
    }
    return (
        <div className="product-card">
            <img src={image} alt="Product" className="product-image" onClick={() => { navigate(`/product/${product._id}`) }} />
            <div>{product.name}</div>
            <div className="card-price">₹{product.price}</div>
            <div className="button" onClick={handleCart}>Add to cart</div>
        </div>
    )
}

export default ProductCard;