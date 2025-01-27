# Aplikacija za recenzije

Ovo je web aplikacija za recenzije koja omogućuje korisnicima pregled i dodavanje recenzija za turističke atrakcije, smještaje i druge lokacije. Aplikacija je izrađena kao projekt za kolegij Uvod u programsko inženjerstvo.

## Funkcionalnosti
  - **Pregled lokacija i recenzija**: Korisnici mogu pregledavati lokacije i čitati recenzije drugih korisnika.
  - **Dodavanje recenzija**: Prijavljeni korisnici mogu dodavati recenzije s ocjenom, komentarima i slikama.
  - **Kategorije**: Lokacije su organizirane u kategorije za lakši pregled.
  - **Upravljanje profilom**: Korisnici mogu uređivati svoje podatke (e-mail, korisničko ime, lozinku) i upravljati vlastitim recenzijama.
  - **Prijava i registracija**: Omogućena je prijava i registracija korisnika putem sustava temeljenog na kolačićima.

## Tehnologije
  - Frontend: React (kreiran pomoću Vite-a)
  - Backend: Node.js, Express
  - Baza podataka: MongoDB
  - Autentifikacija: Kolačići za upravljanje sesijama

## !Prije pokretanja aplikacije!
- Postavke firewall-a: Ako koristite fakultetsku mrežu, može doći do problema s povezivanjem na MongoDB Atlas jer fakultetski firewall blokira pristup. Na normalnim Wi-Fi mrežama sve bi trebalo raditi ispravno. Preporuča se omogućiti pristup MongoDB Atlas-u putem vašeg mrežnih postavki ili koristiti osobnu Wi-Fi mrežu dok se aplikacija pokreće.
- Prije nego što pokrenete aplikaciju, obavezno kopirajte `x.env` datoteku u glavnu mapu projekta i preimenujte ju u `.env`.
- Ova datoteka sadrži važne API ključeve, bazu podataka i druge potrebne environment varijable koje omogućuju ispravan rad aplikacije.

## Kako pokrenuti aplikaciju?
-- Koristeći naredbu `npm start` u terminalu u glavnoj mapi projekta, ili slijediti slijedeće korake:
1. Kloniraj repozitorij -> `git clone https://github.com/tomislavandro/UPI_2425_UPIjmose.git`
2. odi u mapu projekta u terminalu i pokreni naredbu: `npm install`
3. odi u mapu frontend u terminalu unutar projekta (`cd frontend`) i pokreni naredbu: `npm install`
4. za pokretanje aplikacije, vrati se u glavnu mapu projekta u terminalu i pokreni naredu: `npm run all`

## Testiranje aplikacije
- **Backend** -> koristi se `jest` za testiranje backend logike, API endpointova i drugih server-side funkcionalnosti
- **Frontend** -> `vitest` i `jest` koriste se za testiranje React komponenti, dok `react-testing-library` omogućuje testiranje interakcije s DOM-om i simulaciju korisničkog sučelja
- **cijela aplikacija** -> `cypress` je korišten za testiranje funkcionalnosti cijele aplikacije, simuliranje korisničkog iskustva i osiguranje pravilnog rada svih dijelova sustava

## Autori
  Aplikaciju je izradio Tomislav Andro Čanić, Filip Brkljača, Ivan Deni Čotić, Lea Srhoj i Anđela Župan kao dio kolegija Uvod u programsko inženjerstvo.
