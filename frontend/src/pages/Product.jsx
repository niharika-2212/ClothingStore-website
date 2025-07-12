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
    const [selectedSize, setSelectedSize] = useState(""); // <-- Size selection
    const [quantity, setQuantity] = useState(1);           // <-- Quantity selection

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/products/get/${id}`);
                setProduct(res.data);
                if (res.data.sizes && res.data.sizes.length > 0) {
                    setSelectedSize(res.data.sizes[0]); // default size
                }
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };

        fetchProduct();
    }, [id]);

    const handleCart = async () => {
        if (!user) return navigate("/login");
        try {
            const firebaseUser = auth.currentUser;
            if (!firebaseUser) throw new Error("User not authenticated");

            const token = await firebaseUser.getIdToken();

            const res = await axios.post(
                "http://localhost:5000/cart/add",
                {
                    productId: product._id,
                    quantity,
                    size: selectedSize,
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
    };

    const increaseQty = () => {
        if (quantity < product.quantity) {
            setQuantity(prev => prev + 1);
        }
    };

    const decreaseQty = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product">
            <div className="product-content">
                <img src={image} alt="product" className="item-image" />
                <div className="product-details">
                    <h1>{product.name}</h1>
                    <div>
                        <div>Description:</div>
                        <div>{product.description}</div>
                    </div>

                    {/* Quantity Input */}
                    <div className="quantity-section">
                        <label>Quantity:</label>
                        <div className="quantity-controls">
                            <button onClick={decreaseQty}>-</button>
                            <input
                                type="number"
                                value={quantity}
                                readOnly
                            />
                            <button onClick={increaseQty}>+</button>
                        </div>
                    </div>

                    {/* Size Selector */}
                    <div className="size-section">
                        <label htmlFor="size">Size:</label>
                        <select
                            id="size"
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                        >
                            {product.size?.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>

                    <div className="price">₹{product.price}</div>

                    <div className="button cart" onClick={handleCart}>
                        Add to cart
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
