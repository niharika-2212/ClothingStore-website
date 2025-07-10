import React from "react";
import image from "../assets/about.png"
import "../assets/styles/ProductCard.css";
import {useNavigate} from "react-router-dom";
function ProductCard({product}){
    const navigate = useNavigate();
    return(
        <div className="product-card">
            <img src={image} alt="Product" className="product-image" onClick={()=>{navigate(`/product/${product._id}`)}}/>
            <div>{product.name}</div>
            <div className="card-price">₹{product.price}</div>
            <div className="button">Add to cart</div>
        </div>
    )
}

export default ProductCard;