import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { type Product } from '../types';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    useEffect(() => {
        if (!id) return;

        // Тимчасово очищаємо токен для цього запиту
        delete axios.defaults.headers.common['Authorization'];

        axios.get(`${API_URL}/api/products/${id}/`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                error(error.response?.status, error.response?.data);
                setError('Не вдалося завантажити товар');
            })
            .finally(() => setLoading(false));
    }, [id, API_URL]);

    if (loading) {
        return <div className="loading">Завантаження товару...</div>;
    }

    if (error || !product) {
        return (
            <div className="product-not-found" style={{ textAlign: 'center', padding: '80px 20px' }}>
                <h2>Товар не знайдено</h2>
                <p>{error || 'Товар з таким ID не існує'}</p>
                <p style={{ marginTop: '10px', color: '#666' }}>Спробуваний ID: {id}</p>
                <button
                    onClick={() => navigate('/')}
                    className="back-button"
                    style={{ marginTop: '20px' }}
                >
                    ← Повернутися до каталогу
                </button>
            </div>
        );
    }

    const isInStock = product.stock > 0;

    const handleAddToCart = () => {
        if (!isInStock) return;
        addToCart(product);
        showToast(`${product.name} успішно додано в кошик!`);
    };

    return (
        <div className="product-detail">
            <button onClick={() => navigate(-1)} className="back-button">
                ← Назад до каталогу
            </button>

            <div className="detail-wrapper">
                <div className="detail-image-container">
                    {product.image ? (
                        <img src={product.image} alt={product.name} />
                    ) : (
                        <div className="no-image">Фото відсутнє</div>
                    )}
                </div>

                <div className="detail-info">
                    <p className="detail-category">{product.category.name}</p>
                    <h1 className="detail-title">{product.name}</h1>

                    <div className="detail-price">
                        {product.discount_price ? (
                            <>
                                <span className="current-price">{product.final_price} ₴</span>
                                <span className="old-price">{product.price} ₴</span>
                            </>
                        ) : (
                            <span className="current-price">{product.price} ₴</span>
                        )}
                    </div>

                    <div className="detail-specs">
                        <p><strong>Колір:</strong> {product.color || 'Не вказано'}</p>
                        <p><strong>Розмір:</strong> {product.size || 'Не вказано'}</p>
                        <p><strong>Наявність:</strong>
                            <span style={{ color: isInStock ? '#16a34a' : '#ef4444', fontWeight: 'bold' }}>
                                {isInStock ? ' В наявності' : ' Немає в наявності'}
                            </span>
                        </p>
                    </div>

                    <p className="detail-description">{product.description}</p>

                    <button
                        className="add-to-cart-btn"
                        onClick={handleAddToCart}
                        disabled={!isInStock}
                    >
                        {isInStock ? 'Додати в кошик' : 'Немає в наявності'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;