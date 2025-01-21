import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import './styles/Profile.css';

const Profile = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState('');
    const [editReview, setEditReview] = useState(null);
    const [editedComment, setEditedComment] = useState('');
    const [editedRating, setEditedRating] = useState('');

    const getCookie = (name) => Cookies.get(name);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch('http://localhost:1000/users/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            });

            const data = await response.json();
            console.log(data);

            if (data.success) {
                setUserData({
                    username: data.user.username,
                    email: data.user.email,
                    password: '',
                });
                setReviews(data.user.reviews || []);
            } else {
                setError(data.message);
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:1000/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
                credentials: "include"
            });

            const data = await response.json();
            if (data.success) {
                alert('Podaci su uspješno ažurirani');
                setUserData({ ...userData, password: '' });
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Greška prilikom ažuriranja:', error);
            setError('Došlo je do greške prilikom ažuriranja.');
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            const response = await fetch(`http://localhost:1000/reviews/${reviewId}`, {
                method: 'DELETE',
                credentials: "include"
            });

            const data = await response.json();
            if (data.success) {
                setReviews(reviews.filter((review) => review._id !== reviewId));
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Greška prilikom brisanja recenzije:', error);
            setError('Došlo je do greške prilikom brisanja recenzije.');
        }
    };

    const handleEditReview = (review) => {
        setEditReview(review);
        setEditedComment(review.comment || '');
        setEditedRating(review.rating || '');
    };

    const handleUpdateReview = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:1000/reviews/${editReview._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comment: editedComment,
                    rating: editedRating,
                }),
                credentials: "include"
            });

            const data = await response.json();
            if (data.success) {
                setReviews(reviews.map(review => 
                    review._id === editReview._id ? { ...review, comment: editedComment, rating: editedRating } : review
                ));
                setEditReview(null); // Zatvori formu za uređivanje
                setEditedComment('');
                setEditedRating('');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Greška prilikom ažuriranja recenzije:', error);
            setError('Došlo je do greške prilikom ažuriranja recenzije.');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:1000/users/logout', {
                method: 'POST',
                credentials: "include"
            });

            const data = await response.json();
            if (data.success) {
                Cookies.remove('user');
                alert('Uspješno ste se odjavili');
                window.location.href = '/login';
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Greška prilikom odjave:', error);
            setError('Došlo je do greške prilikom odjave.');
        }
    };

    return (
        <div className="profile-container">
            <h2>Profil</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Korisničko ime:</label>
                    <input
                        type="text"
                        value={userData.username}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Lozinka:</label>
                    <input
                        type="password"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    />
                </div>
                <button type="submit">Ažuriraj</button>
            </form>
            <button onClick={handleLogout} className="logout-button">Odjavi se</button>
            <h3>Moje recenzije</h3>
            {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review._id} className="review-card">
                        <h4>{review.location_id ? review.location_id.name : 'Nepoznato mjesto'}</h4>
                        <p><strong>Ocjena:</strong> {review.rating}</p>
                        <p>{review.comment ? review.comment : 'bez komentara'}</p>
                        <div className="review-buttons">
                            <button onClick={() => handleEditReview(review)} className="edit-button">
                                Uredi
                            </button>
                            <button onClick={() => handleDeleteReview(review._id)} className="delete-button">
                                Obriši
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>Nema recenzija za prikaz.</p>
            )}

            {editReview && (
                <div className="edit-review-container">
                    <h4>Uredi recenziju</h4>
                    <form onSubmit={handleUpdateReview}>
                        <div>
                            <label>Ocjena:</label>
                            <input
                                type="number"
                                value={editedRating}
                                onChange={(e) => setEditedRating(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Komentar:</label>
                            <textarea
                                value={editedComment}
                                onChange={(e) => setEditedComment(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Spremi izmjene</button>
                        <button type="button" onClick={() => setEditReview(null)}>Otkaži</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Profile;
