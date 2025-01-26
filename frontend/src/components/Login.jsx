import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import za preusmjeravanje
import './styles/Login.css';
import Cookies from "js-cookie";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Dodano stanje za uspjeh
    const navigate = useNavigate(); // Hook za navigaciju

    // Provjera je li korisnik već prijavljen
    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            navigate('/profile'); // Preusmjeravanje na profil ako je korisnik već prijavljen
        }
    }, [navigate]);



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
                setSuccessMessage('Login success!'); // Postavljanje uspješne poruke
                setError(''); // Resetiranje eventualnih grešaka
                console.log('Login success!', data);
                navigate('/profile'); // Preusmjeravanje nakon uspješne prijave
            } else {
                setSuccessMessage(''); // Resetiranje poruke o uspjehu ako prijava nije uspješna
                setError(data.message);
            }
        } catch (error) {
            setError('Došlo je do greške prilikom prijave.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="login-container">
            <h2>Prijava</h2>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Korisničko ime:</label>
                    <input id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Lozinka:</label>
                    <input id="password"
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
