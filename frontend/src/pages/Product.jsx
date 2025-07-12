import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../assets/styles/Product.css";
import image from "../assets/about.png";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { auth } from "../firebase";
function Product() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useUser();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/products/get/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };

        fetchProduct();
    }, [id]);

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

    if (!product) return <div>Loading...</div>;
    return (
        <div className="product">
            <div className="product-content">
                <img src={image} alt="product-image" className="item-image" />
                <div className="product-details">
                    <h1>{product.name}</h1>
                    <div>
                        <div>description: </div>
                        <div>
                            {product.description}
                        </div>
                    </div>
                    <div>Quantity</div>
                    <div>Size</div>
                    <div>₹{product.price}</div>
                    <div className="button cart" onClick={handleCart}>Add to cart</div>
                </div>
            </div>
        </div >
    )
}

export default Product;