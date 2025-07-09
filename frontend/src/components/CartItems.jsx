import React from "react";
import "../assets/styles/CartItems.css";
function CartItems() {
    return(
        <div className="cart-item-card">
            <div>
                <div>Product name</div>
                <div>Quantity</div>
                <div>Price</div>
            </div>
            <div>X</div>
        </div>
    )
}

export default CartItems;