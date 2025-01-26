import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Categories from '../src/Categories';
import jest from "jest-mock";

describe('Categories Component', () => {
    describe("unit testovi", () => {
        it('treba renderirati bez pogresaka', () => {
            render(
                <MemoryRouter initialEntries={['/']}>
                    <Routes>
                        <Route path="/" element={<Categories />} />
                    </Routes>
                </MemoryRouter>
            );

            expect(screen.getByText('Kategorije')).toBeInTheDocument();
        });
    })

    describe(("funkcionalni testovi"), () => {
        it('treba prikazati botune za kategoriju nakon dohvacanja podataka', async () => {
            // Mock fetch API za vraćanje kategorija
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    json: () =>
                        Promise.resolve({
                            success: true,
                            data: [
                                { _id: '1', name: 'Hoteli', image: '/images/hotel.jpg' },
                                { _id: '2', name: 'Restorani', image: '/images/restaurant.jpg' },
                            ],
                        }),
                })
            );

            render(
                <MemoryRouter initialEntries={['/']}>
                    <Routes>
                        <Route path="/" element={<Categories />} />
                    </Routes>
                </MemoryRouter>
            );

            // Provjera prikaza gumba nakon učitavanja podataka
            await waitFor(() => {
                expect(screen.getByText('Hoteli')).toBeInTheDocument();
                expect(screen.getByText('Restorani')).toBeInTheDocument();
            });
        });
    });

    describe("integracijski testovi", () => {
        it('treba otici na reviews page kada se klikne botun kategorije', async () => {
            // Mock fetch API za vraćanje kategorija
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    json: () =>
                        Promise.resolve({
                            success: true,
                            data: [
                                { _id: '1', name: 'Hoteli', image: '/images/hotel.jpg' },
                                { _id: '2', name: 'Restorani', image: '/images/restaurant.jpg' },
                            ],
                        }),
                })
            );

            render(
                <MemoryRouter initialEntries={['/']}>
                    <Routes>
                        <Route path="/" element={<Categories />} />
                        <Route path="/reviews/:categoryId" element={<div>Pregled recenzija</div>} />
                    </Routes>
                </MemoryRouter>
            );

            // Pričekaj učitavanje podataka
            await waitFor(() => {
                expect(screen.getByText('Hoteli')).toBeInTheDocument();
            });

            // Klikni na gumb kategorije
            const hotelButton = screen.getByText('Hoteli');
            fireEvent.click(hotelButton);

            // Provjeri preusmjeravanje
            await waitFor(() => {
                expect(screen.getByText('Pregled recenzija')).toBeInTheDocument();
            });
        });
    });
});
