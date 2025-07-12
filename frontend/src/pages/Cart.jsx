import React, { useEffect, useState } from "react";
import "../assets/styles/Cart.css";
import CartItems from "../components/CartItems";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const res = await axios.get("http://localhost:5000/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(res.data.items);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Error fetching cart:", err);
      navigate("/login"); // fallback in case token is invalid
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!token || !userData) return navigate("/login");

    try {
      const { data: order } = await axios.post(
        "http://localhost:5000/payment/create-order",
        { amount: total, currency: "INR" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: "rzp_test_ExOWRBgBrgcI6v",
        amount: order.amount,
        currency: order.currency,
        name: "My Clothing Store",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              "http://localhost:5000/payment/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: total,
                orderId: "TEMP_ORDER_ID_123",
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            await axios.post(
              "http://localhost:5000/orders/place-order",
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            alert("Payment successful!");
            navigate("/confirmed");
          } catch (verifyError) {
            console.error("Payment verification failed:", verifyError);
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: userData.name || "Customer",
          email: userData.email,
          contact: userData.phone || "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment failed");
    }
  };

  return (
    <div className="cart">
      <h1 className="cart-heading">Your Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          <h2>Items in your cart</h2>
          {cartItems.map((item) => (
            <CartItems key={item._id} item={item} />
          ))}
        </div>
        <div className="total-container">
          <h2>Price details</h2>
          <div>total Price:₹{total}</div>
          <div className="button" onClick={handlePayment}>Proceed to payment</div>
        </div>
      </div>
    </div>
  )
}

export default Cart;