import React, { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:1000/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess('Registracija uspješna! Možete se prijaviti.');
                setError(''); // Resetiraj grešku
            } else {
                setError(data.message);
                setSuccess(''); // Resetiraj uspjeh
            }
        } catch (error) {
            setError('Došlo je do greške prilikom registracije.');
            setSuccess(''); // Resetiraj uspjeh
        }
    };

    return (
        <div className="register-container">
            <h2>Registracija</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
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
                <button type="submit">Registriraj se</button>
            </form>
            <p>
                Već imate račun? <a href="/login">Prijavite se</a>
            </p>
        </div>
    );
};

export default Register;
