import { useState, useEffect } from 'react';
import { type Product } from '../types';
import '../styles/Filters.css';

interface FiltersProps {
    products: Product[];
    onFilterChange: (filtered: Product[]) => void;
}

const Filters = ({ products, onFilterChange }: FiltersProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(10000);
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string>('');

    const categories = Array.from(new Set(products.map(p => p.category.name)));
    const colors = Array.from(new Set(products.map(p => p.color).filter(Boolean)));
    const sizes = Array.from(new Set(products.map(p => p.size).filter(Boolean)));

    useEffect(() => {
        let result = [...products];

        // Фільтр по категорії
        if (selectedCategory) {
            result = result.filter(p => p.category.name === selectedCategory);
        }

        // Фільтр по ціні
        result = result.filter(p => {
            const price = parseFloat(p.final_price || p.price);
            return price >= minPrice && price <= maxPrice;
        });

        // Фільтр по кольору
        if (selectedColor) {
            result = result.filter(p => p.color === selectedColor);
        }

        // Фільтр по розміру
        if (selectedSize) {
            result = result.filter(p => p.size === selectedSize);
        }

        onFilterChange(result);
    }, [selectedCategory, minPrice, maxPrice, selectedColor, selectedSize, products, onFilterChange]);

    const resetFilters = () => {
        setSelectedCategory('');
        setMinPrice(0);
        setMaxPrice(10000);
        setSelectedColor('');
        setSelectedSize('');
    };

    return (
        <div className="filters">
            <div className="filters-header">
                <h3>Фільтри</h3>
                <button onClick={resetFilters} className="reset-btn">Скинути</button>
            </div>

            {/* Категорії */}
            <div className="filter-group">
                <h4>Категорія</h4>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">Всі категорії</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Ціна */}
            <div className="filter-group">
                <h4>Ціна</h4>
                <div className="price-range">
                    <input
                        type="number"
                        placeholder="Від"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                    />
                    <span>—</span>
                    <input
                        type="number"
                        placeholder="До"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
                </div>
            </div>

            {/* Колір */}
            {colors.length > 0 && (
                <div className="filter-group">
                    <h4>Колір</h4>
                    <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                        <option value="">Всі кольори</option>
                        {colors.map(color => (
                            <option key={color} value={color}>{color}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Розмір */}
            {sizes.length > 0 && (
                <div className="filter-group">
                    <h4>Розмір</h4>
                    <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                        <option value="">Всі розміри</option>
                        {sizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default Filters;