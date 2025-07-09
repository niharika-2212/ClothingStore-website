import React from "react";
import image from "../assets/about.png"
import "../assets/styles/ProductCard.css";
import {useNavigate} from "react-router-dom";
function ProductCard(){
    const navigate = useNavigate();
    return(
        <div className="product-card">
            <img src={image} alt="Product" className="product-image" onClick={()=>{navigate("/product")}}/>
            <div>Product name</div>
            <div className="card-price">$999</div>
            <div className="button">Add to cart</div>
        </div>
    )
}

export default ProductCard;