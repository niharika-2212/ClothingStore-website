import { useState } from "react";
import "../assets/styles/Shop.css";
import ProductCard from "../components/ProductCard.jsx";
import { useEffect } from "react";
import axios from "axios";
function Shop() {
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchAllProducts();
    }, []);
    const fetchAllProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/products");
            setProducts(res.data);
        } catch (error) {
            console.log("error fetching products: ", error);
        }
    };


    const handleFilter = async (e) => {
        e.preventDefault();

        try {
            if (category && !minPrice && !maxPrice) {
                const res = await axios.get(`http://localhost:5000/products/category/${category}`);
                setProducts(res.data);
            } else if (!category && (minPrice || maxPrice)) {
                const res = await axios.get(`http://localhost:5000/products/price?min=${minPrice}&max=${maxPrice}`);
                setProducts(res.data);
            } else if (category && (minPrice || maxPrice)) {
                const res = await axios.get(`http://localhost:5000/products/category/${category}`);
                const filtered = res.data.filter(p => {
                    return (
                        (!minPrice || p.price >= minPrice) &&
                        (!maxPrice || p.price <= maxPrice)
                    );
                });
                setProducts(filtered);
            } else {
                fetchAllProducts();
            }
        } catch (err) {
            console.error('Error filtering products', err);
        }
    }
    return (
        <div className="shop">
            <div className="shop-container">
                <form className="filter-form" onSubmit={handleFilter}>
                    <div>
                        <label htmlFor="category">Category:</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="Shirts">Shirts</option>
                            <option value="Jackets">Jackets</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            placeholder="from"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="to"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="button">
                        Apply
                    </button>
                </form>
                <div className="product-result">
                    {/* <ProductCard product={product} /> */}
                    {products.length === 0 ? (
                        <p>No products found.</p>
                    ) : (
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Shop;
