import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ▼▼▼ 追加：制作物フォルダから水彩画を読み込む ▼▼▼
import cityBg from "./picture_city.jpg";

import Home from "./Home.jsx";
import ProductDetail from "./ProductDetail.jsx";
import Cart from "./Cart.jsx";
import Checkout from "./Checkout.jsx";
import Success from "./Success.jsx";
import About from "./About.jsx";
import Legal from "./Legal.jsx";
import Privacy from "./Privacy.jsx";
import ProductList from "./ProductList.jsx";
import Admin from "./Admin.jsx";
import AdminLogin from "./AdminLogin.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CartAddedModal from "./components/CartAddedModal.jsx";
import { CartProvider } from "./context/CartContext.jsx";

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    let rafId = null;
    let timeoutId = null;

    if (!hash) {
      window.scrollTo(0, 0);
      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }

    const id = hash.replace('#', '');
    const start = Date.now();

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      if (Date.now() - start > 1200) {
        window.scrollTo(0, 0);
        return;
      }

      rafId = requestAnimationFrame(tryScroll);
    };

    timeoutId = setTimeout(tryScroll, 0);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [pathname, search, hash]);

  return null;
}

export default function App() {
  const [showOpening, setShowOpening] = useState(false);

  useEffect(() => {
    // すでに閉じている場合は何もしない
    if (!showOpening) return;

    // 3.5秒後に自動で閉じる
    const timer = setTimeout(() => {
      setShowOpening(false);
    }, 3500);

    // Enterキーでスキップ
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // デフォルトの動作を抑制
        setShowOpening(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // クリーンアップ
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showOpening]); // showOpeningが変化するたびにリスナーを再設定し、最新の状態を維持する

  return (
    <>
      <style>{`
        .font-serif { font-family: 'Noto Serif JP', serif; }
        .font-hand { font-family: 'Yuji Syuku','Yuji Mai','Noto Serif JP',serif; }
        .elegant-font { font-family: 'Noto Serif JP', serif; }
        .brush-font { font-family: 'Yuji Syuku','Yuji Mai','Noto Serif JP',serif; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        /* 和紙風テクスチャ背景 */
        .washi-pattern {
          background-color: #faf8f1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }

        /* レンガのモチーフ */
        .brick-pattern {
          background-color: #f7f2e7;
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

      {/* ▼▼▼ ここからオープニング画面 ▼▼▼ */}
      <AnimatePresence>
        {showOpening && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#faf8f1] cursor-pointer"
            onClick={() => setShowOpening(false)}
          >
            {/* 背景の水彩画（インポートしたcityBgを使用） */}
            <img
              src={cityBg}
              alt="小樽の街並み"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* 文字を読みやすくする薄いフィルター */}
            <div className="absolute inset-0 bg-[#faf8f1]/45"></div>

            {/* 浮かび上がる文字 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="relative z-10 text-center px-4"
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl elegant-font font-bold tracking-widest drop-shadow-md text-[#4a3f35]">
                想いを花に
                <br className="md:hidden" />
                小樽で百年。
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ▲▲▲ オープニング画面ここまで ▲▲▲ */}

      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col text-lg leading-relaxed">
            <Navbar />
            <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success />} />
                <Route path="/about" element={<About />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin-login" element={<AdminLogin />} />
              </Routes>
            </div>
            <Footer />
          </div>
          {/* カート追加モーダル：Router内に置くことでuseNavigateが使える */}
          <CartAddedModal />
        </Router>
      </CartProvider>
    </>
  );
}
