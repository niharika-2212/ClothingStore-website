import React from "react";
import "../assets/styles/CartItems.css";
function CartItems({item}) {
    return(
        <div className="cart-item-card">
            <div>
                <div>Product: {item.name}</div>
                <div>Quantity: {item.quantity}</div>
                <div>Price: ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</div>
                <div>Size: {item.size}</div>
            </div>
            <div>X</div>
        </div>
    )
}

export default CartItems;