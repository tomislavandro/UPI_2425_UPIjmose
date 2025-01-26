import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Potrebno za Link komponente
import Navbar from '../src/components/Navbar';

describe('Navigacijska traka', () => {
    const renderNavbar = () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );
    };

    describe("funkcionalni testovi", () => {
        it('renderira navigacijsku traku sa svim linkovima', () => {
            renderNavbar();
    
            // Provjera linkova
            expect(screen.getByText('Početna stranica')).toBeInTheDocument();
            expect(screen.getByText('Prijava')).toBeInTheDocument();
            expect(screen.getByText('👤')).toBeInTheDocument();
        });

        it('renderira navbar-right sa ispravnom dijecom', () => {
            renderNavbar();
    
            const navbarRight = screen.getByText('Prijava').closest('div'); // Roditelj element za Prijava
            expect(navbarRight).toHaveClass('navbar-right');
            expect(navbarRight).toContainElement(screen.getByText('Prijava'));
            expect(navbarRight).toContainElement(screen.getByText('👤'));
        });
    })

    describe("unit testovi", () => {
        it('linkovi imaju tocne href atribute', () => {
            renderNavbar();
    
            // Provjera atributa href za linkove
            expect(screen.getByText('Početna stranica').closest('a')).toHaveAttribute('href', '/');
            expect(screen.getByText('Prijava').closest('a')).toHaveAttribute('href', '/login');
            expect(screen.getByText('👤').closest('a')).toHaveAttribute('href', '/profile');
        });
    
        it('nav traka ima ispravnu CSS klasu', () => {
            renderNavbar();
    
            // Provjera klase na glavnom navbar elementu
            const navbar = screen.getByRole('navigation'); // <nav> element
            expect(navbar).toHaveClass('navbar');
        });
    })
});
