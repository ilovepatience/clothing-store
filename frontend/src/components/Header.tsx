import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import '../styles/Header.css';

interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const Header = ({ searchTerm, setSearchTerm }: HeaderProps) => {
    const navigate = useNavigate();
    const { getTotalItems } = useCart();
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <header className="header">
            <div className="container">
                <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    FashionStore
                </h1>

                <div className="search-input">
                    <input
                        type="text"
                        placeholder="Пошук товарів..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="actions">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/cart')}
                    >
                        Кошик ({getTotalItems()})
                    </button>

                    {isAuthenticated && user ? (
                        <>
                            <button
                                className="btn btn-secondary"
                                onClick={() => navigate('/profile')}
                            >
                                Профіль ({user.username})
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={logout}
                            >
                                Вийти
                            </button>
                        </>
                    ) : (
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/login')}
                        >
                            Увійти
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;