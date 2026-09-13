import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleCheckout = () => {
        if (cart.length === 0) return;

        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        clearCart();
        navigate('/');
    };

    if (cart.length === 0 && !showModal) {
        return (
            <div className="cart-page empty-cart">
                <h2>Ваш кошик порожній</h2>
                <button
                    onClick={() => navigate('/')}
                    className="btn btn-primary"
                >
                    Перейти до каталогу
                </button>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1>Кошик</h1>

            <div>
                {cart.map(item => (
                    <div key={item.id} className="cart-item">
                        <div className="cart-item-image">
                            {item.image && <img src={item.image} alt={item.name} />}
                        </div>

                        <div className="cart-item-info">
                            <h3>{item.name}</h3>
                            <p>{item.category.name}</p>
                            <p className="cart-item-price">
                                {parseFloat(item.final_price || item.price)} ₴
                            </p>

                            <div className="quantity-controls">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                            </div>
                        </div>

                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="remove-btn"
                        >
                            Видалити
                        </button>
                    </div>
                ))}
            </div>

            <div className="cart-total">
                <h2>Разом: {getTotalPrice().toFixed(2)} ₴</h2>

                <div className="cart-buttons">
                    <button onClick={clearCart} className="btn btn-secondary">
                        Очистити кошик
                    </button>
                    <button onClick={handleCheckout} className="btn btn-primary">
                        Оформити замовлення
                    </button>
                </div>
            </div>

            {/* Модальне вікно */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>✅ Дякуємо за замовлення!</h2>
                        <p>Наш менеджер зв'яжеться з вами найближчим часом та надішле всю інформацію на вашу електронну пошту.</p>
                        <button onClick={closeModal} className="btn btn-primary">
                            Повернутися на головну
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;