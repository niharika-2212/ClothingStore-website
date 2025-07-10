import React from "react";
import "../assets/styles/Cart.css";
import CartItems from "../components/CartItems";
import axios from "axios";
function Cart() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderUrl = "http://localhost:5000/create-order";
        const { data } = await axios.post(orderUrl, {
            amount: 500,
            currency: 'INR'
        });

        const options = {
            key: "rzp_test_jSDdriFwvF0ZTy", // Replace with actual key
            amount: data.amount,
            currency: data.currency,
            name: "My store",
            description: "Test Payment",
            order_id: data.id,
            handler: function (response) {
                // You can also send this to backend for verification
                navigate("/success", { state: { response } });
            },
            prefill: {
                name: "Customer Name",
                email: "customer@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const razor = new window.Razorpay(options);
        razor.open();
    }
     
    return (
        <div className="cart">
            <h1 className="cart-heading">Your Cart</h1>
            <div className="cart-content">
                <div className="cart-items">
                    <h2>Items in your cart</h2>
                    <CartItems />
                </div>
                <div className="total-container">
                    <h2>Price details</h2>
                    <div>total Price:$99</div>
                    <div className="button" onClick={handleSubmit}>Proceed to payment</div>
                </div>
            </div>
        </div>
    )
}

export default Cart;