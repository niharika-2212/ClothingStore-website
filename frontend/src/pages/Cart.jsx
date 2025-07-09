import React from "react";
import "../assets/styles/Cart.css";
import CartItems from "../components/CartItems";

function Cart() {
    return (
        <div className="cart">
            <h1 className="cart-heading">Your Cart</h1>
            <div className="cart-content">
                <div className="cart-items">
                    <h2>Items in your cart</h2>
                    <CartItems/>
                </div>
                <div className="total-container">
                    <h2>Price details</h2>
                    <div>total Price:$99</div>
                    <div className="button">Proceed to payment</div>
                </div>
            </div>
        </div>
    )
}

export default Cart;