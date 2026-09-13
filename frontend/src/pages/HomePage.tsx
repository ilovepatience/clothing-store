import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import { type Product } from '../types';

const ITEMS_PER_PAGE = 9;

interface HomePageProps {
    searchTerm: string;
}

const HomePage = ({ searchTerm }: HomePageProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState<'default' | 'price-low' | 'price-high' | 'name'>('default');
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    // Завантаження товарів
    useEffect(() => {
        axios.get(`${API_URL}/api/products/`)
            .then(response => {
                setProducts(response.data);
                setFilteredProducts(response.data);   // Важливо!
            })
            .catch(error => console.error('Помилка завантаження товарів:', error))
            .finally(() => setLoading(false));
    }, [API_URL]);

    // Фільтрація + Пошук + Сортування (товари без запасу — в кінець)
    const displayedProducts = useMemo(() => {
        let result = [...filteredProducts];

        // Пошук
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            result = result.filter(product =>
                product.name.toLowerCase().includes(term) ||
                (product.description && product.description.toLowerCase().includes(term)) ||
                (product.category?.name && product.category.name.toLowerCase().includes(term))
            );
        }

        // Сортування
        result.sort((a, b) => {
            const stockA = a.stock || 0;
            const stockB = b.stock || 0;

            // Товари без запасу — в кінець
            if (stockA === 0 && stockB > 0) return 1;
            if (stockB === 0 && stockA > 0) return -1;

            // Звичайне сортування
            if (sortOption === 'price-low') {
                return parseFloat(a.final_price || a.price) - parseFloat(b.final_price || b.price);
            }
            if (sortOption === 'price-high') {
                return parseFloat(b.final_price || b.price) - parseFloat(a.final_price || b.price);
            }
            if (sortOption === 'name') {
                return a.name.localeCompare(b.name);
            }
            return 0;
        });

        return result;
    }, [filteredProducts, sortOption, searchTerm]);

    const totalPages = Math.ceil(displayedProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedProducts = displayedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="shop-container">
            <div className="filters-sidebar">
                <Filters
                    products={products}
                    onFilterChange={setFilteredProducts}
                />
            </div>

            <div className="main-content">
                <div className="top-bar">
                    <h2 className="catalog-title">Наш каталог</h2>

                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value as 'default' | 'price-low' | 'price-high' | 'name')}
                        className="sort-select"
                    >
                        <option value="default">За замовчуванням</option>
                        <option value="price-low">Ціна: від дешевих</option>
                        <option value="price-high">Ціна: від дорогих</option>
                        <option value="name">За назвою (А-Я)</option>
                    </select>
                </div>

                <p className="catalog-count">
                    Знайдено товарів: {displayedProducts.length}
                    {searchTerm && ` за запитом "${searchTerm}"`}
                </p>

                {loading ? (
                    <div className="loading">Завантаження товарів...</div>
                ) : (
                    <>
                        <div className="products-grid">
                            {paginatedProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </>
                )}

                {displayedProducts.length === 0 && !loading && (
                    <div className="no-results">
                        <p>Товарів за вашим запитом не знайдено</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;