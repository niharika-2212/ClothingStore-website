import './App.css'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About.jsx';
import Shop from './pages/Shop.jsx';
import Contact from './pages/Contact.jsx';
import Footer from './components/Footer.jsx';
import Copyright from './components/Copyright.jsx';
import Product from './pages/Product.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Orderconfirm from './pages/Orderconfirm.jsx';
import Cart from './pages/Cart.jsx';
function App() {
  return (
    <div className='app'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirmed" element={<Orderconfirm />} />
          <Route path="/cart" element={<Cart />} />

        </Routes>
        <Footer />
        <Copyright />
      </Router>
    </div>
  )
}

export default App
