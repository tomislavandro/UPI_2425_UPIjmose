import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddReview from './addReview';

const Reviews = () => {
    const { categoryId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviewsByCategory = async () => {
            try {
                const response = await fetch(`http://localhost:1000/reviews/by-category/${categoryId}`);
                const data = await response.json();
                if (data.success) {
                    setReviews(data.reviews);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviewsByCategory();
    }, [categoryId]);

    const handleReviewAdded = (newReview) => {
        setReviews((prevReviews) => [...prevReviews, newReview]);
    };

    return (
        <div className="reviews-container">
            <h2>Recenzije za kategoriju</h2>
            <AddReview categoryId={categoryId} onReviewAdded={handleReviewAdded} />
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review._id}>
                        <h4>{review.location_id.name}</h4>
                        <p>{review.comment}</p>
                        <p>Ocjena: {review.rating}</p>
                    </div>
                ))
            ) : (
                <p>Nema recenzija za ovu kategoriju.</p>
            )}
        </div>
    );
};

export default Reviews;
