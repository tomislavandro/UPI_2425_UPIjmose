import React from 'react';

const ReviewList = ({ reviews }) => {
    return (
        <div className="review-list">
            <h3>Recenzije</h3>
            {reviews.length === 0 ? (
                <p>Nema recenzija za ovu kategoriju.</p>
            ) : (
                reviews.map((review) => (
                    <div key={review._id} className="review-item">
                        <p>{review.content}</p>
                        <small>Autor: {review.username}</small>
                    </div>
                ))
            )}
        </div>
    );
};

export default ReviewList;
