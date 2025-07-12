import React from "react";
import "../assets/styles/OrderConfirm.css";
import { useNavigate } from "react-router-dom";
function Orderconfirm(){
    const navigate=useNavigate();
    return(
        <div className="confirmed">
            <h1>Order Confirmed</h1>
            <p>Thank you for your order! Your order has been successfully placed.</p>
            <div className="button" onClick={()=>{navigate("/")}}>Back to Home</div>
        </div>
    )
}

export default Orderconfirm;