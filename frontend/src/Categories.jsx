import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Koristi useNavigate umjesto useHistory
import "./styles/categories.css";
//pozdrav canicu
const Categories = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate(); // Koristi useNavigate za preusmjeravanje

    useEffect(() => {
        const fetchCategoriesWithAverages = async () => {
            try {
                const response = await fetch("http://localhost:1000/categories/with-averages");
                const data = await response.json();
                if (data.success) {
                    setCategories(data.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategoriesWithAverages();
    }, []);

    const handleCategoryClick = (categoryId) => {
        // Preusmjeri korisnika na stranicu recenzija za odabranu kategoriju
        navigate(`/reviews/${categoryId}`); // Ovdje postavi rutu za recenzije
    };

    return (
        <div className="categories-container">
            <h2>Kategorije</h2>
            <div className="category-buttons">
                {categories.map((category) => (
                    <button
                        key={category._id}
                        className="category-button"
                        onClick={() => handleCategoryClick(category._id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Categories;
