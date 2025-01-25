import { render, screen, fireEvent } from '@testing-library/react';
import jest from "jest-mock";
import AddReview from "../src/components/addReview";

describe("AddReview", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe("funkcionalni testovi", () => {
    it('renderira formu sa svim obaveznim poljima', () => {
      // Mockaj fetch da odmah vrati uspješan odgovor
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ success: true, locations: [] }),
      });

      render(<AddReview categoryId="1" onReviewAdded={() => { }} />);

      expect(screen.getByLabelText("Ocjena:")).toBeInTheDocument();
      expect(screen.getByLabelText("Komentar:")).toBeInTheDocument();
      expect(screen.getByLabelText("Slika (URL):")).toBeInTheDocument();
      expect(screen.getByLabelText("Odaberi lokaciju:")).toBeInTheDocument();
    });
  })

  describe("integracijski testovi", () => {
    it('dodaje recenziju sa postojecom lokacijom', async () => {
      // Mockaj fetch da vrati postojeće lokacije
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ success: true, locations: [{ _id: '1', name: 'Location 1' }] }),
      });
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ success: true, review: { _id: '1' } }),
      });

      render(<AddReview categoryId="1" onReviewAdded={() => { }} />);

      fireEvent.change(screen.getByLabelText("Ocjena:"), { target: { value: 5 } });
      fireEvent.change(screen.getByLabelText("Komentar:"), { target: { value: 'Great place!' } });
      fireEvent.change(screen.getByLabelText("Slika (URL):"), { target: { value: 'image_url' } });
      fireEvent.change(screen.getByLabelText("Odaberi lokaciju:"), { target: { value: '1' } });

      fireEvent.click(screen.getByRole("button", { name: "Dodaj recenziju" }));
      await screen.findByText("Recenzija uspješno dodana!"); // Provjeri je li se prikazala poruka o uspjehu
    });

    it('dodaje recenziju sa novom lokacijom', async () => {
      // Mockaj fetch da vrati praznu listu lokacija i kasnije uspješno dodane lokacije
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ success: true, locations: [] }),
      });
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ success: true, data: { _id: 'new_location_id' } }),
      });
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ success: true, review: { _id: '1' } }),
      });

      render(<AddReview categoryId="1" onReviewAdded={() => { }} />);

      fireEvent.change(screen.getByLabelText("Ocjena:"), { target: { value: 5 } });
      fireEvent.change(screen.getByLabelText("Komentar:"), { target: { value: 'Awesome!' } });
      fireEvent.change(screen.getByLabelText("Slika (URL):"), { target: { value: 'image_url' } });
      fireEvent.change(screen.getByLabelText("Odaberi lokaciju:"), { target: { value: 'add' } });
      fireEvent.change(screen.getByLabelText("Ime nove lokacije:"), { target: { value: 'New Location' } });
      fireEvent.change(screen.getByLabelText("Adresa:"), { target: { value: 'New Address' } });

      fireEvent.click(screen.getByRole("button", { name: "Dodaj recenziju" }));

      await screen.findByText("Recenzija uspješno dodana!");
    });
  })

  describe("testovi upravljanja greskama", () => {
    it('upravlja greskama prilikom dodavanja recenzije', async () => {
      // Mockaj fetch da vrati grešku
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ success: false, message: 'Error' }),
      });

      render(<AddReview categoryId="1" onReviewAdded={() => { }} />);

      fireEvent.click(screen.getByRole("button", { name: "Dodaj recenziju" }));

      await screen.findByText("Greška prilikom dodavanja recenzije.");
    });
  })
})
