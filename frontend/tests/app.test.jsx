import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('glavna stranica app', () => {
    describe("funkcionalni testovi", () => {
        it('renderira navbar i kategorije', () => {
            render(<App />);
            expect(screen.getByRole('navigation')).toBeInTheDocument();
            expect(screen.getByText('Kategorije')).toBeInTheDocument();
        });
    });

    describe("integracijski testovi", () => {
        it('renderira login', () => {
            render(<App />);
            const link = screen.getByText('Prijava');
            fireEvent.click(link);
            expect(screen.getByText('Prijavi se')).toBeInTheDocument();
        });
    
        it('renderira registraciju', () => {
            render(<App />);
            const link = screen.getByText('Nemate račun?');
            fireEvent.click(link);
            expect(screen.getByText('Registrirajte se')).toBeInTheDocument();
        });

        it('renderira profil', () => {
            // Simuliraj kolačić za prijavu
            global.document.cookie = 'user=testuser';
            render(<App />);
            const link = screen.getByText('👤');
            fireEvent.click(link);
            expect(screen.getByText('👤')).toBeInTheDocument();
        });
    });
});
