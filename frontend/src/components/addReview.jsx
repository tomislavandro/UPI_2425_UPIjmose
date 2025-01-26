import React, { useEffect, useState } from 'react';
import "./styles/Reviews.css"

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
    const [description, setDescription] = useState('');
    const [addingNewLocation, setAddingNewLocation] = useState(false);
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');


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

        const selectedLocation = locations.find(location => location._id === locationId);
        const locationName = selectedLocation ? selectedLocation.name : '';

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
                    reviewData.location_id = locationData.data._id;
                    setLocations([...locations, locationData.data]);
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
                setMessage('Recenzija uspješno dodana!');
                setMessageColor('green');
                // Obavijesti roditeljsku komponentu o novoj recenziji
                if (addingNewLocation) {
                    onReviewAdded({ ...data.data, name: newLocation });
                } else {
                    onReviewAdded({ ...data.data, name: locationName });
                }
                // resetiraj sve an pocetne vrijednosti
                setRating(1);
                setComment('');
                setImage('');
                setLocationId('');
                setNewLocation('');
                setLat('');
                setLng('');
                setAddress('');
                setDescription('');
                setAddingNewLocation(false);

            } else {
                // alert(data.message);
                setMessage(data.message);
                setMessageColor('red');
            }
        } catch (error) {
            console.error("Greška prilikom dodavanja recenzije:", error);
            setMessage("Greška prilikom dodavanja recenzije.");
            setMessageColor('red');
        }
    };

    const handleLocationChange = (e) => {
        const selectedLocation = e.target.value;
        setLocationId(selectedLocation);
        setAddingNewLocation(selectedLocation === 'add'); // Ako je odabrano dodavanje nove lokacije
    };

    return (
        <form onSubmit={handleSubmit} className="forma">
            <h3>Dodaj recenziju</h3>
            <label htmlFor="ocjena">Ocjena:</label>
            <select id="ocjena" value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
            <label htmlFor="comment">Komentar:</label>
            <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
            <label htmlFor="image">Slika (URL):</label>
            <input id="image" type="text" value={image} onChange={(e) => setImage(e.target.value)} />
            <label htmlFor="location">Odaberi lokaciju:</label>
            <select id="location" value={locationId} onChange={handleLocationChange}>
                <option value="">-- Odaberi lokaciju --</option>
                {locations.map(location => (
                    <option key={location._id} value={location._id}>{location.name}</option>
                ))}
                <option value="add">DODAJ LOKACIJU</option>
            </select>
            {addingNewLocation && (
                <>
                    <label htmlFor="newLocation">Ime nove lokacije:</label>
                    <input id="newLocation" type="text" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} placeholder="Ime nove lokacije" />
                    <label htmlFor="newAdress">Adresa:</label>
                    <input id="newAdress" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adresa" />
                    <label htmlFor="newDescription">Opis:</label>
                    <textarea id="newDescription" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Opis lokacije" />
                    <label htmlFor="newLatitude">Latitude:</label>
                    <input id="newLatitude" type="number" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Latitude" />
                    <label htmlFor="newLongitude">Longitude:</label>
                    <input id="newLongitude" type="number" value={lng} onChange={(e) => setLng(e.target.value)} placeholder="Longitude" />
                </>
            )}
            <button type="submit">Dodaj recenziju</button>
            {message && (
                <p style={{ color: messageColor }}>{message}</p>
            )}
        </form>
    );
};

export default AddReview;
