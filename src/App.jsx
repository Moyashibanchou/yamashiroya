import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import ProductDetail from './ProductDetail.jsx';
import Cart from './Cart.jsx';
import Checkout from './Checkout.jsx';
import Success from './Success.jsx';
import About from './About.jsx';
import ProductList from './ProductList.jsx';
import Navbar from './components/Navbar.jsx';
import { CartProvider } from './context/CartContext.jsx';

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Yuji+Syuku&display=swap');
        
        .elegant-font { font-family: 'Noto Serif JP', serif; }
        .brush-font { font-family: 'Yuji Syuku', serif; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* 和紙風テクスチャ背景 */
        .washi-pattern {
          background-color: #fdfbf6;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }
        
        /* レンガのモチーフ */
        .brick-pattern {
          background-color: #f9f5ed;
          background-image: url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d7ccc8' fill-opacity='0.15'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        /* 柔らかいシャドウ */
        .soft-shadow {
          box-shadow: 0 8px 30px rgba(74, 63, 53, 0.06);
        }
        .soft-shadow-sm {
          box-shadow: 0 -2px 14px rgba(74, 63, 53, 0.04);
        }
        .soft-shadow-header {
          box-shadow: 0 4px 16px rgba(74, 63, 53, 0.03);
        }
      `}</style>

      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<ProductList />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}
