import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [reviews, setReviews] = useState([]);
    const [editReview, setEditReview] = useState(null);
    const [editedComment, setEditedComment] = useState('');
    const [editedRating, setEditedRating] = useState('');


    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch('http://localhost:1000/users/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
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
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            if (data.success) {
                alert('Podaci su uspješno ažurirani');
                setUserData({ ...userData, password: '' });
            } else
        } catch (error) {
            console.error('Greška prilikom ažuriranja:', error);
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
                })
            });

            const data = await response.json();
            if (data.success) {
                setReviews(reviews.map(review => 
                    review._id === editReview._id ? { ...review, comment: editedComment, rating: editedRating } : review
                ));
                setEditReview(null); // Zatvori formu za uređivanje
                setEditedComment('');
                setEditedRating('');
            }
        } catch (error) {
            console.error('Greška prilikom ažuriranja recenzije:', error);
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
            <h3>Moje recenzije</h3>

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
