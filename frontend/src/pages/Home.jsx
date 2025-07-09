import React from "react";
import "../assets/styles/Home.css";
import Hero from "../components/Hero.jsx";
import ProductCard from "../components/ProductCard.jsx";
function Home(){
    return(
        <div className="home">
            <Hero/>
            <div className="home-items">
                <h1>Popular Items</h1>
                <div className="home-cards">
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>

                </div>
            </div>
        </div>
    )
}

export default Home;