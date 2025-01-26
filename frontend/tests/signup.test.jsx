import { waitFor, render, screen, fireEvent } from "@testing-library/react";
import jest from "jest-mock";
import Register from "../src/components/Signup";

describe("Registracija", () => {
    global.fetch = jest.fn();

    beforeEach(() => {
        fetch.mockClear();
    });

    describe("unit testovi", () => {
        it('renderira registracijsku komponentu sa svim inputima i botunima', () => {
            render(<Register />);
    
            expect(screen.getByText('Registracija')).toBeInTheDocument();
            expect(screen.getByLabelText('Korisničko ime:')).toBeInTheDocument();
            expect(screen.getByLabelText('Email:')).toBeInTheDocument();
            expect(screen.getByLabelText('Lozinka:')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Registriraj se' })).toBeInTheDocument();
            expect(screen.getByText('Već imate račun?')).toBeInTheDocument();
            expect(screen.getByText('Prijavite se')).toBeInTheDocument();
    
            // provjera je li se link ispravno renderirao
            const link = screen.getByText("Prijavite se");
            expect(link.tagName).toBe("A");
        });

        it('dopusta korisniku da ispuni formu', () => {
            render(<Register />);
    
            // ispuni formu
            fireEvent.change(screen.getByLabelText('Korisničko ime:'), { target: { value: 'testuser' } });
            fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'testuser@example.com' } });
            fireEvent.change(screen.getByLabelText('Lozinka:'), { target: { value: 'password123' } });
    
            // provjeri jesu li se vrijednosti tocno postavile
            expect(screen.getByLabelText('Korisničko ime:').value).toBe('testuser');
            expect(screen.getByLabelText('Email:').value).toBe('testuser@example.com');
            expect(screen.getByLabelText('Lozinka:').value).toBe('password123');
        });

        it("navigira na stranicu za prijavu kada se klikne 'Prijavi se' ", () => {
            render(<Register />);
    
            // klikni na link za registraciju
            fireEvent.click(screen.getByText('Prijavite se'));
    
            // provjeri je li URL promijenjen na stranicu za registraciju
            const link = screen.getByText('Prijavite se');
            expect(link.getAttribute('href')).toBe('/login');
        });
    });

    describe("integracijski testovi", () => {
        it('salje formu', async () => {
            // simuliraj uspjesni odgovor sa servera
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce({
                    success: true,
                    message: 'Registracija uspješna!',
                }),
            });
    
            render(<Register />);
    
            // ispuni formu
            fireEvent.change(screen.getByLabelText('Korisničko ime:'), { target: { value: 'testuser3' } });
            fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'testuser3@example.com' } });
            fireEvent.change(screen.getByLabelText('Lozinka:'), { target: { value: 'password123' } });
    
            // posalji formu
            fireEvent.click(screen.getByRole('button', { name: 'Registriraj se' }));
    
            // provjeri je li pozvan fetch
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(
                'http://localhost:1000/users/',
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: 'testuser3',
                        password: 'password123',
                        email: 'testuser3@example.com',
                    }),
                })
            );
    
            await waitFor(() => {
                expect(screen.getByText('Registracija uspješna! Možete se prijaviti.')).toBeInTheDocument();
            });
        });
    
        it('prikazuje gresku kada se forma salje sa praznim poljima', async () => {
            // simuliraj server odgovor koji sadrzi gresku zbog praznih polja
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce({
                    success: false,
                    message: 'Sva polja su obavezna',
                }),
            });
    
            render(<Register />);
    
            // posalji formu bez popunjavanja polja
            fireEvent.click(screen.getByRole('button', { name: 'Registriraj se' }));
    
            expect(fetch).not.toHaveBeenCalled();
        });
    });
})
