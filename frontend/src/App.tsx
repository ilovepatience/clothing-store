import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';   // ← Додано

import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

import './App.css';
import './index.css';

function App() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <ToastProvider>   {/* ← Обгортаємо весь додаток */}
            <div>
                <Header
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <Routes>
                    <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>

                <footer>
                    <div className="container">
                        © 2026 FashionStore — Дипломна робота
                    </div>
                </footer>
            </div>
        </ToastProvider>
    );
}

export default App;