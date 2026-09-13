import { type Product } from '../types';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import '../styles/ProductCard.css';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const isInStock = product.stock > 0;

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isInStock) return;

        addToCart(product);
        showToast(`${product.name} успішно додано в кошик!`);
    };

    return (
        <div className="card" onClick={handleCardClick}>
            <div className="card-image">
                {product.image ? (
                    <img src={product.image} alt={product.name} />
                ) : (
                    <span>Фото відсутнє</span>
                )}
            </div>

            <div className="card-content">
                <p className="card-category">{product.category.name}</p>
                <h3 className="card-title">{product.name}</h3>
                <p className="card-description">{product.description}</p>

                <div className="card-price">
                    {product.discount_price ? (
                        <>
                            <span className="current-price">{product.final_price} ₴</span>
                            <span className="old-price">{product.price} ₴</span>
                        </>
                    ) : (
                        <span className="current-price">{product.price} ₴</span>
                    )}
                </div>

                <button
                    className={`add-to-cart ${!isInStock ? 'out-of-stock' : ''}`}
                    onClick={handleAddToCart}
                    disabled={!isInStock}
                >
                    {isInStock ? 'В кошик' : 'Немає в наявності'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;