import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const auth = useAuth();
    const { register } = auth;
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});

        if (password !== confirmPassword) {
            setFieldErrors({ confirmPassword: 'Паролі не співпадають' });
            return;
        }

        setLoading(true);

        try {
            await register(username, email, password);
            alert('✅ Реєстрація успішна! Тепер ви можете увійти.');
            navigate('/login');
        } catch (err: any) {
            const data = err.response?.data;

            if (data && typeof data === 'object') {
                if (data.username) setFieldErrors({ username: data.username[0] || data.username });
                if (data.email) setFieldErrors({ email: data.email[0] || data.email });
                if (data.password) setFieldErrors({ password: data.password[0] || data.password });

                if (data.detail) setError(data.detail);
                else if (data.non_field_errors) setError(data.non_field_errors[0]);
            } else {
                setError('Щось пішло не так. Спробуйте ще раз.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <h2>Реєстрація</h2>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit} className="register-form">
                <div>
                    <input
                        type="text"
                        placeholder="Ім'я користувача"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {fieldErrors.username && <p className="field-error">{fieldErrors.username}</p>}
                </div>

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {fieldErrors.email && <p className="field-error">{fieldErrors.email}</p>}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {fieldErrors.password && <p className="field-error">{fieldErrors.password}</p>}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Підтвердіть пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {fieldErrors.confirmPassword && <p className="field-error">{fieldErrors.confirmPassword}</p>}
                </div>

                <button type="submit" className="register-btn" disabled={loading}>
                    {loading ? 'Реєстрація...' : 'Зареєструватися'}
                </button>
            </form>

            <p className="register-link">
                Вже маєте акаунт? <Link to="/login">Увійти</Link>
            </p>
        </div>
    );
};

export default Register;