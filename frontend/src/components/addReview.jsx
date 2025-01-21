import React, { useEffect, useState } from 'react';

const AddReview = ({ categoryId, onReviewAdded }) => {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [image, setImage] = useState('');
    const [locations, setLocations] = useState([]);
    const [locationId, setLocationId] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [lat, setLat] = useState(''); // Latitude
    const [lng, setLng] = useState(''); // Longitude
    const [address, setAddress] = useState(''); // Address
    const [description, setDescription] = useState(''); // Description
    const [addingNewLocation, setAddingNewLocation] = useState(false); // State for adding new location

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch(`http://localhost:1000/locations/by-category/${categoryId}`);
                const data = await response.json();
                if (data.success) {
                    setLocations(data.locations);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error("Greška pri dohvatu lokacija:", error);
            }
        };

        fetchLocations();
    }, [categoryId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userCookie = document.cookie.split('; ').find(row => row.startsWith('user='));
        const userId = userCookie ? JSON.parse(decodeURIComponent(userCookie.split('=')[1]))._id : null;

        const reviewData = {
            user_id: userId,
            location_id: locationId,
            rating,
            comment,
            image,
        };

        // Ako je nova lokacija unesena, prvo je dodaj
        if (newLocation && addingNewLocation) {
            const newLocationData = {
                name: newLocation,
                category_id: categoryId,
                address, // Dodaj adresu
                description, // Dodaj opis
                coordinates: { lat: parseFloat(lat), lng: parseFloat(lng) }, // Dodaj koordinate
            };

            try {
                const locationResponse = await fetch('http://localhost:1000/locations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newLocationData),
                });

                const locationData = await locationResponse.json();
                if (locationData.success) {
                    // Ako je nova lokacija uspješno dodana, postavi locationId na novu lokaciju
                    reviewData.location_id = locationData.data._id; // Koristi ID nove lokacije
                } else {
                    alert(locationData.message);
                    return; // Prekini ako nije uspjelo
                }
            } catch (error) {
                console.error("Greška pri dodavanju nove lokacije:", error);
                return; // Prekini ako je došlo do greške
            }
        }

        // Zatim dodaj recenziju
        try {
            const response = await fetch('http://localhost:1000/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });

            const data = await response.json();
            if (data.success) {
                alert("Recenzija uspješno dodana!");
                setRating(1);
                setComment('');
                setImage('');
                setLocationId(''); // Resetiraj izbor lokacije
                setNewLocation(''); // Resetiraj unos nove lokacije
                setLat(''); // Resetiraj unos latitude
                setLng(''); // Resetiraj unos longitude
                setAddress(''); // Resetiraj unos adrese
                setDescription(''); // Resetiraj unos opisa
                setAddingNewLocation(false); // Resetiraj stanje za dodavanje nove lokacije
                onReviewAdded(data.review); // Obavijesti roditeljsku komponentu o novoj recenziji
                window.location.reload() // !mozda treba obrisati -> zasad radi ovako
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Greška prilikom dodavanja recenzije:", error);
        }
    };

    const handleLocationChange = (e) => {
        const selectedLocation = e.target.value;
        setLocationId(selectedLocation);
        setAddingNewLocation(selectedLocation === 'add'); // Ako je odabrano dodavanje nove lokacije
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Dodaj recenziju</h3>
            <label>Ocjena:</label>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
            <label>Komentar:</label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
            <label>Slika (URL):</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
            <label>Odaberi lokaciju:</label>
            <select value={locationId} onChange={handleLocationChange}>
                <option value="">-- Odaberi lokaciju --</option>
                {locations.map(location => (
                    <option key={location._id} value={location._id}>{location.name}</option>
                ))}
                <option value="add">DODAJ LOKACIJU</option>
            </select>
            {addingNewLocation && (
                <>
                    <label>Ime nove lokacije:</label>
                    <input type="text" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} placeholder="Ime nove lokacije" />
                    <label>Adresa:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adresa" />
                    <label>Opis:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Opis lokacije" />
                    <label>Latitude:</label>
                    <input type="number" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Latitude" />
                    <label>Longitude:</label>
                    <input type="number" value={lng} onChange={(e) => setLng(e.target.value)} placeholder="Longitude" />
                </>
            )}
            <button type="submit">Dodaj recenziju</button>
        </form>
    );
};

export default AddReview;
