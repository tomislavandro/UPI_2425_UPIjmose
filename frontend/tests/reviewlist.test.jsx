import ReviewList from "../src/components/ReviewList";
import React from 'react';
import { render, screen } from '@testing-library/react';

describe('ReviewList komponenta', () => {

    describe("unit testovi", () => {
        it('renderira heading i poruku kada nema recenzija', () => {
            render(<ReviewList reviews={[]} />);

            expect(screen.getByText('Recenzije')).toBeInTheDocument();

            expect(screen.getByText('Nema recenzija za ovu kategoriju.')).toBeInTheDocument();
        });

        it('renderira listu recenzija kada postoje recenzije za kategoriju', () => {
            const reviews = [
                { _id: '1', content: 'Odlična lokacija!', username: 'Marko' },
                { _id: '2', content: 'Prekrasno iskustvo.', username: 'Ana' },
            ];

            render(<ReviewList reviews={reviews} />);

            expect(screen.getByText('Recenzije')).toBeInTheDocument();

            // Provjera sadržaja recenzija
            expect(screen.getByText('Odlična lokacija!')).toBeInTheDocument();
            expect(screen.getByText('Autor: Marko')).toBeInTheDocument();
            expect(screen.getByText('Prekrasno iskustvo.')).toBeInTheDocument();
            expect(screen.getByText('Autor: Ana')).toBeInTheDocument();
        });
    })

    describe("funkcionalni testovi", () => {
        it('renderira tocan broj recenzija', () => {
            const reviews = [
                { _id: '1', content: 'Odlična lokacija!', username: 'Marko' },
                { _id: '2', content: 'Prekrasno iskustvo.', username: 'Ana' },
                { _id: '3', content: 'Solidno, ali može bolje.', username: 'Petar' },
            ];

            const { container } = render(<ReviewList reviews={reviews} />);

            // Provjera broja elemenata s klasom "review-item"
            const reviewItems = container.getElementsByClassName('review-item');
            expect(reviewItems.length).toBe(3);
        });

        it('primjenjuje tocno CSS klase na elemente', () => {
            const reviews = [
                { _id: '1', content: 'Odlična lokacija!', username: 'Marko' },
            ];

            render(<ReviewList reviews={reviews} />);

            // Provjera klase na glavnom divu
            const reviewList = screen.getByRole('heading', { level: 3 }).closest('div');
            expect(reviewList).toHaveClass('review-list');

            // Provjera klase za pojedinačne recenzije
            const reviewItem = screen.getByText('Odlična lokacija!').closest('div');
            expect(reviewItem).toHaveClass('review-item');
        });
    })
});
