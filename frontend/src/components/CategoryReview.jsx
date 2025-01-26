import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddReview from './addReview';
import "../components/styles/Reviews.css"

const Reviews = () => {
    const { categoryId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviewsByCategory = async () => {
            try {
                const response = await fetch(`http://localhost:1000/reviews/by-category/${categoryId}`);
                const data = await response.json();
                console.log("zzzz", data)
                if (data.success) {
                    setReviews(data.reviews);
                } else {
                    console.error(data.message);
                    setReviews([]);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
                setReviews([]);
            }
        };

        fetchReviewsByCategory();
    }, [categoryId]);

    const handleReviewAdded = (newReview) => {
        setReviews((prevReviews) => [...prevReviews, newReview]);
    };


    const handleDeleteReview = async (reviewId) => {
        try {
            const response = await fetch(`http://localhost:1000/reviews/${reviewId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.success) {
                setReviews((prevReviews) => prevReviews.filter(review => review._id !== reviewId));
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;
        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push('★');
        }
    
        for (let i = 0; i < emptyStars; i++) {
            stars.push('☆');
        }
    
        return stars.join(' ');
    };
    

    return (
        <div className="reviews-container">
            <div className="add-review-container">
                <AddReview categoryId={categoryId} onReviewAdded={handleReviewAdded} />
            </div>
            <div className="reviews-list">
                <h2>Recenzije za kategoriju</h2>
                {reviews.length > 0 ? (
                    console.log('Rendering Reviews:', reviews),// testiranje ispisa
                    reviews.map((review) => (
                        <div key={review._id} className='okvirrecenzije'>
                            <h4 className="naslovRecenzije">{review.location_id.name ?? review.name}</h4>
                            <p>{review.comment || "bez komentara"}</p>
                            <p><span className="hide">Ocjena:</span> <span className="hide">{review.rating}</span>
                                <span>{renderStars(review.rating)}</span>
                            </p>
                            {/* <button onClick={() => handleDeleteReview(review._id)}>Obriši</button> */}
                        </div>
                    ))
                ) : (
                    <p>Nema recenzija za ovu kategoriju.</p>
                )}
            </div>
        </div>
    );
};

export default Reviews;
