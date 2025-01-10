import React, { useState } from 'react';
import Cookies from "js-cookie";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:1000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });

            const data = await response.json();

            if (data.success) {
                Cookies.set('user', JSON.stringify(data.data), { expires: 7 }); // Kolačić će isteći za 7 dana
                console.log('Prijava uspješna:', data);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Došlo je do greške prilikom prijave.');
        }
    };

    return (
        <div className="login-container">
            <h2>Prijava</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Korisničko ime:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Lozinka:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Prijavi se</button>
            </form>
            <p>
                Nemate račun? <a href="/register">Registrirajte se</a>
            </p>
        </div>
    );
};

export default Login;
