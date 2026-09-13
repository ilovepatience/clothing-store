import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated || !user) {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                <h2>Особистий кабінет</h2>

                <div className="profile-info">
                    <div className="profile-field">
                        <strong>Ім'я користувача:</strong>
                        <span>{user.username}</span>
                    </div>

                    {user.email && (
                        <div className="profile-field">
                            <strong>Email:</strong>
                            <span>{user.email}</span>
                        </div>
                    )}

                    <div className="profile-field">
                        <strong>Статус:</strong>
                        <span style={{ color: 'green' }}>Онлайн</span>
                    </div>
                </div>

                <div className="profile-actions">
                    <button onClick={handleLogout} className="logout-btn">
                        Вийти з акаунту
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;