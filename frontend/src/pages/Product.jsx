import React from "react";
import "../assets/styles/Product.css";
import image from "../assets/about.png"
function Product() {
    return (
        <div className="product">
            <div className="product-content">
                <img src={image} alt="product-image" className="item-image" />
                <div className="product-details">
                    <h1>product name</h1>
                    <div>
                        <div>description: </div>
                        <div>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum nam excepturi repudiandae asperiores tempora esse quisquam porro optio reiciendis.
                        </div>
                    </div>
                    <div>Quantity</div>
                <div>Size</div>
                <div>price</div>
                <div className="button cart">Add to cart</div>
            </div>
        </div>
        </div >
    )
}

export default Product;