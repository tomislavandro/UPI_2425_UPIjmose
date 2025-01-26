import { waitFor, render, screen, fireEvent } from "@testing-library/react";
import jest from "jest-mock";
import Profile from "../src/components/Profile";

describe("profil", () => {
    global.fetch = jest.fn();

    beforeEach(() => {
        fetch.mockClear();
    });

    describe("funkcionalni testovi", () => {
        it('treba dohvatiti korisnicke podatke i prikazati username i email', async () => {
            global.fetch.mockResolvedValueOnce({
                json: async () => ({
                    success: true,
                    user: {
                        username: 'testuser',
                        email: 'test@example.com',
                        reviews: [],
                    },
                }),
            });
    
            render(<Profile />);
    
            await waitFor(() => expect(screen.getByLabelText('Korisničko ime:')).toHaveValue('testuser'));
            expect(screen.getByLabelText('Email:')).toHaveValue('test@example.com');
        });

        it('treba prikazati recenzije', async () => {
            global.fetch.mockResolvedValueOnce({
                json: async () => ({
                    success: true,
                    user: {
                        username: 'testuser',
                        email: 'test@example.com',
                        reviews: [
                            {
                                _id: '1',
                                location_id: { name: 'Test Location' },
                                rating: 5,
                                comment: 'Great place!'
                            },
                        ],
                    },
                }),
            });
    
            render(<Profile />);
    
            await waitFor(() => {
                expect(screen.getByText('Test Location')).toBeInTheDocument();
                expect(screen.getByText('Ocjena:')).toBeInTheDocument();
                expect(screen.getByText('5')).toBeInTheDocument();
                expect(screen.getByText('Great place!')).toBeInTheDocument();
            });
        });

        it('treba obrisati recenziju kada se pritisne botun za brisanje', async () => {
            global.fetch.mockResolvedValueOnce({
                json: async () => ({
                    success: true,
                    user: {
                        username: 'testuser',
                        email: 'test@example.com',
                        reviews: [
                            {
                                _id: '1',
                                location_id: { name: 'Test Location' },
                                rating: 5,
                                comment: 'Great place!'
                            },
                        ],
                    },
                }),
            });
    
            global.fetch.mockResolvedValueOnce({
                json: async () => ({ success: true }),
            });
    
            render(<Profile />);
    
            await waitFor(() => expect(screen.getByText('Test Location')).toBeInTheDocument());
    
            fireEvent.click(screen.getByRole('button', { name: 'Obriši' }));
    
            await waitFor(() => expect(screen.queryByText('Test Location')).not.toBeInTheDocument());
        });
        
        it('treba prikazati i urediti recenziju i azurirati ju', async () => {
            global.fetch.mockResolvedValueOnce({
                json: async () => ({
                    success: true,
                    user: {
                        username: 'testuser',
                        email: 'test@example.com',
                        reviews: [
                            {
                                _id: '1',
                                location_id: { name: 'Test Location' },
                                rating: 5,
                                comment: 'Great place!'
                            },
                        ],
                    },
                }),
            });
    
            global.fetch.mockResolvedValueOnce({
                json: async () => ({ success: true }),
            });
    
            render(<Profile />);
    
            await waitFor(() => expect(screen.getByText('Great place!')).toBeInTheDocument());
    
            fireEvent.click(screen.getByRole('button', { name: 'Uredi' }));
    
            fireEvent.change(screen.getByLabelText('Komentar:'), { target: { value: 'Updated comment' } });
            fireEvent.change(screen.getByLabelText('Ocjena:'), { target: { value: '4' } });
    
            fireEvent.submit(screen.getByText('Spremi izmjene'));
    
            await waitFor(() => {
                expect(screen.getByText('Updated comment')).toBeInTheDocument();
                expect(screen.getByText('Ocjena:')).toBeInTheDocument();
                expect(screen.getByText('4')).toBeInTheDocument();
            });
        });
    })

    describe("integracijski testovi", () => {
        it('treba azurirati korisnicke podatke kada je forma podnesena', async () => {
            // Mock fetch za dohvaćanje korisničkih podataka (poziv u useEffect)
            global.fetch = vi.fn()
                .mockResolvedValueOnce({
                    json: async () => ({
                        success: true,
                        user: {
                            username: 'testuser',
                            email: 'testuser@example.com',
                            reviews: [],
                        },
                    }),
                })
                // Mock fetch za ažuriranje korisničkih podataka
                .mockResolvedValueOnce({
                    json: async () => ({ success: true }),
                });
    
            render(<Profile />);
    
            // Promjena korisničkog imena i e-maila
            fireEvent.change(screen.getByLabelText('Korisničko ime:'), { target: { value: 'newuser' } });
            fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'new@example.com' } });
    
            // Slanje forme
            fireEvent.submit(screen.getByRole('button', { name: 'Ažuriraj' }));
    
            // Provjera je li ispravan API poziv napravljen za ažuriranje korisničkih podataka
            await waitFor(() =>
                expect(global.fetch).toHaveBeenCalledWith(
                    'http://localhost:1000/users/update',
                    expect.objectContaining({
                        method: 'PUT',
                        body: JSON.stringify({ username: 'newuser', email: 'new@example.com', password: '' }),
                    })
                )
            );
        });
    })

    describe("end-to-end testovi", () => {
        it('treba se tocno odjaviti', async () => {
            // Mock za dohvaćanje korisničkih podataka
            global.fetch
                .mockResolvedValueOnce({
                    json: async () => ({
                        success: true,
                        user: { username: 'testuser', email: 'test@example.com' }, // Dodavanje mock podataka
                    }),
                })
                .mockResolvedValueOnce({
                    json: async () => ({ success: true }), // Mock za logout poziv
                });
    
            const { getByText } = render(<Profile />);
    
            fireEvent.click(getByText('Odjavi se'));
    
            await waitFor(() => {
                expect(global.fetch).toHaveBeenCalledWith(
                    'http://localhost:1000/users/logout',
                    expect.objectContaining({ method: 'POST' })
                );
            });
        });
    })
})
