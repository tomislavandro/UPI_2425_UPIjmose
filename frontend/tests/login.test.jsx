import { waitFor, render, screen, fireEvent } from "@testing-library/react";
import jest from "jest-mock";
import Login from "../src/components/Login";
import { BrowserRouter } from 'react-router-dom';


describe("login", () => {

    global.fetch = jest.fn();

    beforeEach(() => {
        fetch.mockClear();
    });

    beforeEach(() => {
        jest.spyOn(global, 'fetch'); // Praćenje poziva na globalni fetch
    });

    afterEach(() => {
        fetch.mockRestore(); // Očisti mock nakon svakog testa
    });


    describe("unit testovi", () => {
        it("renderira login komponentu sa svim inputima and botunima", () => {
            render(
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            );
            expect(screen.getByText('Prijava')).toBeInTheDocument();
            expect(screen.getByLabelText('Korisničko ime:')).toBeInTheDocument();
            expect(screen.getByLabelText('Email:')).toBeInTheDocument();
            expect(screen.getByLabelText('Lozinka:')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Prijavi se' })).toBeInTheDocument();
        });

        it("dopusta korisniku da ispuni formu", () => {
            render(
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            );
    
            // ispuni formu
            fireEvent.change(screen.getByLabelText('Korisničko ime:'), { target: { value: 'testuser' } });
            fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'testuser@example.com' } });
            fireEvent.change(screen.getByLabelText('Lozinka:'), { target: { value: 'password123' } });
    
            // provjeri jesu li vrijednosti tocno postavljene
            expect(screen.getByLabelText('Korisničko ime:').value).toBe('testuser');
            expect(screen.getByLabelText('Email:').value).toBe('testuser@example.com');
            expect(screen.getByLabelText('Lozinka:').value).toBe('password123');
        });

        it("pokaze poruku sa greskom kada se forma posalje sa praznim poljima", () => {

            // simuliraj server odgovor koji sadrzi gresku zbog praznih polja
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce({
                    success: false,
                    message: 'Sva polja su obavezna',
                }),
            });
    
            render(
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            );
    
            fireEvent.click(screen.getByRole('button', { name: 'Prijavi se' }));
    
            expect(fetch).not.toHaveBeenCalled();
        });

        it("navigira na registracijsku stranicu kada se klikne 'Registrirajte se' ", () => {
            render(
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            );
    
            // klikni na link za registraciju
            fireEvent.click(screen.getByText('Registrirajte se'));
    
            // provjeri je li URL promijenjen na stranicu za registraciju
            const link = screen.getByText('Registrirajte se');
            expect(link.getAttribute('href')).toBe('/register');
        });
    })
    
    describe("integracijski testovi", () => {
        it("posalje formu", async () => {
            // Simuliraj uspješan odgovor servera
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce({
                    success: true,
                    data: { username: 'testuser', email: 'testuser@example.com' },
                }),
            });
    
            render(
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            );
    
            // Popuni formu
            fireEvent.change(screen.getByLabelText('Korisničko ime:'), { target: { value: 'testuser' } });
            fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'testuser@example.com' } });
            fireEvent.change(screen.getByLabelText('Lozinka:'), { target: { value: 'password123' } });
    
            // Pošalji formu
            fireEvent.click(screen.getByRole('button', { name: 'Prijavi se' }));
    
            // Provjeri je li `fetch` pozvan
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(
                'http://localhost:1000/users/login',
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: 'testuser',
                        password: 'password123',
                        email: 'testuser@example.com',
                    }),
                })
            );
    
            // Provjeri je li uspješna poruka ili kolačić postavljen
            await (waitFor(() => expect(screen.queryByText('Login success!')).toBeInTheDocument()));
    
            // Provjeri prikaz greške nije prisutan
            await (waitFor(() => expect(screen.queryByText('Invalid email or password')).not.toBeInTheDocument()));
        });
    })
})
