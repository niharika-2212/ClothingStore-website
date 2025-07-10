import {useState, useEffect} from "react";
import "../assets/styles/Home.css";
import Hero from "../components/Hero.jsx";
import ProductCard from "../components/ProductCard.jsx";
import axios from "axios";
function Home() {
    const [topProducts,setTopProducts] = useState([]);
    useEffect(() => {
        const fetchTopProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/products/top');
                setTopProducts(res.data);
            } catch (err) {
                console.error("Error fetching top products", err);
            }
        };

        fetchTopProducts();
    }, []);
    return (
        <div className="home">
            <Hero />
            <div className="home-items">
                <h1>Popular Items</h1>
                <div className="home-cards">
                    {topProducts.length === 0 ? (
                        <p>No products found.</p>
                    ) : (
                        topProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    )}

                </div>
            </div>
        </div>
    )
}

export default Home;