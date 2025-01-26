// import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Reviews from '../src/components/CategoryReview';

describe('Reviews komponenta', () => {
    describe("unit testovi", () => {
        it('treba renderirati formu iz Add Review', () => {
            render(
                <MemoryRouter initialEntries={['/category/123']}>
                    <Routes>
                        <Route path="/category/:categoryId" element={<Reviews />} />
                    </Routes>
                </MemoryRouter>
            );
    
            expect(screen.getByRole("button", { name: "Dodaj recenziju" })).toBeInTheDocument();
        });
    })

    describe("integracijski testovi", () => {
        it('treba uspjesno poslati Add Review formu sa svim popunjenim poljima', async () => {
            render(
                <MemoryRouter initialEntries={['/category/123']}>
                    <Routes>
                        <Route path="/category/:categoryId" element={<Reviews />} />
                    </Routes>
                </MemoryRouter>
            );
    
            const ratingSelect = screen.getByLabelText('Ocjena:');
            const commentTextarea = screen.getByLabelText('Komentar:');
            const imageUrlInput = screen.getByLabelText('Slika (URL):');
            const locationSelect = screen.getByLabelText('Odaberi lokaciju:');
            const submitButton = screen.getByRole('button', { name: 'Dodaj recenziju' });
    
            fireEvent.change(ratingSelect, { target: { value: '5' } });
            fireEvent.change(commentTextarea, { target: { value: 'Great place!' } });
            fireEvent.change(imageUrlInput, { target: { value: 'https://example.com/image.jpg' } });
            fireEvent.change(locationSelect, { target: { value: 'Location 1' } });
    
            fireEvent.click(submitButton);
    
            // provjeri je li recenzija prikazana
            await waitFor(() => expect(screen.getByText('Great place!')).toBeInTheDocument());
        });
    })

    describe("funkcionalni testovi", () => {
        it('treba renderirati bez pogresaka', () => {
            render(
                <MemoryRouter initialEntries={['/category/123']}>
                    <Routes>
                        <Route path="/category/:categoryId" element={<Reviews />} />
                    </Routes>
                </MemoryRouter>
            );
    
            expect(screen.getByText('Recenzije za kategoriju')).toBeInTheDocument();
        });
    
        it('treba prikazati poruku kada nema recenzija', async () => {
            render(
                <MemoryRouter initialEntries={['/category/123']}>
                    <Routes>
                        <Route path="/category/:categoryId" element={<Reviews />} />
                    </Routes>
                </MemoryRouter>
            );
    
            expect(screen.getByText('Nema recenzija za ovu kategoriju.')).toBeInTheDocument();
        });

        it('treba prikazati gresku prilikom slanja forme bez lokacije', async () => {
            render(
                <MemoryRouter initialEntries={['/category/123']}>
                    <Routes>
                        <Route path="/category/:categoryId" element={<Reviews />} />
                    </Routes>
                </MemoryRouter>
            );
    
            const ratingSelect = screen.getByLabelText('Ocjena:');
            const commentTextarea = screen.getByLabelText('Komentar:');
            const imageUrlInput = screen.getByLabelText('Slika (URL):');
            const locationSelect = screen.getByLabelText('Odaberi lokaciju:');
            const submitButton = screen.getByRole('button', { name: 'Dodaj recenziju' });
    
            fireEvent.change(ratingSelect, { target: { value: '5' } });
            fireEvent.change(commentTextarea, { target: { value: 'Great place!' } });
            fireEvent.change(imageUrlInput, { target: { value: 'https://example.com/image.jpg' } });
    
            // ne odabiri lokaciju
            fireEvent.click(submitButton);
    
            // provjeri je li se prikazala poruka o gresci
            await waitFor(() => expect(screen.getByText('Please provide all fields')).toBeInTheDocument());
        });
    
        it('treba prikazati recenziju nakon dodavanja svih obaveznih opcija', async () => {
            render(
                <MemoryRouter initialEntries={['/category/123']}>
                    <Routes>
                        <Route path="/category/:categoryId" element={<Reviews />} />
                    </Routes>
                </MemoryRouter>
            );
    
            const ratingSelect = screen.getByLabelText('Ocjena:');
            const commentTextarea = screen.getByLabelText('Komentar:');
            const imageUrlInput = screen.getByLabelText('Slika (URL):');
            const locationSelect = screen.getByLabelText('Odaberi lokaciju:');
            const submitButton = screen.getByRole('button', { name: 'Dodaj recenziju' });
    
            fireEvent.change(ratingSelect, { target: { value: '5' } });
            fireEvent.change(commentTextarea, { target: { value: 'Great place!' } });
            fireEvent.change(imageUrlInput, { target: { value: 'https://example.com/image.jpg' } });
            fireEvent.change(locationSelect, { target: { value: 'Location 1' } });
    
            fireEvent.click(submitButton);
    
            // provjeri je li recenzija prikazana
            await waitFor(() => {
                expect(screen.getByText('Great place!')).toBeInTheDocument();
                expect(screen.getByText('Ocjena:')).toBeInTheDocument();
                expect(screen.getByText('5')).toBeInTheDocument();
            })
        });
    })
});
