# Dokumentacija za testiranje aplikacije

## Backend

### 1. **Testovi za kategorije**
Testovi za API rute koje omogućuju pregled svih kategorija i stvaranje novih kategorija.

Datoteke:
 - `tests/backend/categories/categories.test.js` - Testiranje rute za dohvat svih kategorija i stvaranje novih kategorija.

Opis testova:

#### Test 1: Dohvati sve kategorije
- Cilj: Provjeriti API rutu za dohvat svih kategorija.
##### Opis:
 1. Test kreira novu kategoriju s nazivom "Test Category".
 2. Zatim šalje GET zahtjev na /categories kako bi provjerio sve kategorije.
 3. Provodi se provjera statusnog koda (trebao bi biti 200) i provjera da odgovor sadrži success: true i data.
 4. Provodi se dodatna provjera da li je nova kategorija pravilno dohvaćena iz baze, uključujući provjeru svojstava poput name, description i image.
##### Očekivani rezultat:
- Statusni kod odgovora treba biti 200.
- Odgovor treba sadržavati ispravne podatke o kategoriji.

#### Test 2: Stvori novu kategoriju
- Cilj: Provjeriti API rutu za stvaranje nove kategorije.
##### Opis:
1. Test definira novi objekt kategorije s nazivom "New Category" i pripadajućim podacima (description, image).
2. Zatim šalje POST zahtjev na /categories za stvaranje nove kategorije.
3. Provodi se provjera statusnog koda (trebao bi biti 201 za uspješno stvaranje).
4. Provodi se provjera da odgovor sadrži success: true i data, te da novo stvorena kategorija ima ispravan naziv, opis i sliku.
##### Očekivani rezultat:
- Statusni kod odgovora treba biti 201.
- Odgovor treba sadržavati ispravne podatke o novo stvorenoj kategoriji.

### 2. **Testovi za lokacije**
Testovi za API rute koje omogućuju dodavanje, dohvat, ažuriranje i prikaz lokacija prema kategorijama.

Datoteke:
- `tests/backend/locations/locations.test.js` - Testiranje rute za dodavanje, dohvat i ažuriranje lokacija.

Opis testova:

#### Test 1: Dodaj novu lokaciju
- Cilj: Provjeriti API rutu za dodavanje nove lokacije.
##### Opis:
1. Test definira novu lokaciju s nazivom "New Location", povezanu s prethodno kreiranom kategorijom "Test Category2".
2. Zatim šalje POST zahtjev na /locations za stvaranje nove lokacije.
3. Provodi se provjera statusnog koda (trebao bi biti 201 za uspješno stvaranje).
4. Provodi se provjera da odgovor sadrži success: true i data, te da novo stvorena lokacija ima ispravan naziv, opis, adresu i koordinate.
##### Očekivani rezultat:
- Statusni kod odgovora treba biti 201.
- Odgovor treba sadržavati ispravne podatke o novo stvorenoj lokaciji, uključujući koordinate.

#### Test 2: Dohvatiti sve lokacije
- Cilj: Provjeriti API rutu za dohvat svih lokacija.
##### Opis:
1. Test šalje GET zahtjev na /locations za dohvat svih lokacija.
2. Provodi se provjera statusnog koda (trebao bi biti 200).
3. Provodi se provjera da odgovor sadrži success: true i data, te da data sadrži niz.
##### Očekivani rezultat:
- Statusni kod odgovora treba biti 200.
- Odgovor treba sadržavati niz lokacija pod ključem data.

#### Test 3: Ažuriraj postojeću lokaciju
- Cilj: Provjeriti API rutu za ažuriranje postojećih lokacija.
##### Opis:
1. Test prvo stvara lokaciju s nazivom "Update Location" i šalje PUT zahtjev na /locations/{id} za ažuriranje podataka.
2. Provodi se provjera statusnog koda (trebao bi biti 200 za uspješno ažuriranje).
3. Provodi se provjera da su podaci o lokaciji ispravno ažurirani, uključujući naziv, opis, adresu i koordinate.
##### Očekivani rezultat:
- Statusni kod odgovora treba biti 200.
- Odgovor treba sadržavati ažurirane podatke o lokaciji.

#### Test 4: Dohvati lokaciju po ID-u
- Cilj: Provjeriti API rutu za dohvat lokacije prema ID-u.
##### Opis:
1. Test prvo stvara lokaciju s nazivom "Get Location" i šalje GET zahtjev na /locations/by-category/{category_id} kako bi dohvatili lokaciju povezanu s kategorijom.
2. Provodi se provjera statusnog koda (trebao bi biti 200).
3. Provodi se provjera da odgovor sadrži ispravne podatke o lokaciji, uključujući naziv, opis, adresu i koordinate.
##### Očekivani rezultat:
- Statusni kod odgovora treba biti 200.
- Odgovor treba sadržavati ispravne podatke o lokaciji prema ID-u i pripadajućoj kategoriji.


### 3. **Testovi za recenzije**
Testovi za API rute koje omogućuju stvaranje, dohvat, ažuriranje i brisanje recenzija.

Datoteke:
- `tests/backend/reviews/reviews.test.js` - Testiranje rute za stvaranje, dohvat, ažuriranje i brisanje recenzija.

Opis testova:

#### Test 1: Stvori novu recenziju
- Cilj: Provjeriti API rutu za stvaranje nove recenzije.
##### Opis:
1. Test definira novu recenziju s ocjenom 5 i komentarom "Great place!" povezanu s korisnikom "testuser2" i lokacijom "Test Location5".
2. Zatim šalje POST zahtjev na /reviews za stvaranje nove recenzije.
3. Provodi se provjera statusnog koda (trebao bi biti 201 za uspješno stvaranje).
4. Provodi se provjera da odgovor sadrži success: true i data, te da novo stvorena recenzija ima ispravnu ocjenu i komentar.
##### Očekivani rezultat:
- Statusni kod odgovora treba biti 201.
- Odgovor treba sadržavati ispravne podatke o novo stvorenoj recenziji, uključujući ocjenu i komentar.

#### Test 2: Dohvati sve recenzije
- Cilj: Provjeriti API rutu za dohvat svih recenzija
##### Opis:
1. Test šalje GET zahtjev na /reviews za dohvat svih recenzija.
2. Provodi se provjera statusnog koda (trebao bi biti 200).
3. Provodi se provjera da odgovor sadrži success: true i data, te da data sadrži niz.
##### Očekivani rezultat:
- Statusni kod odgovora treba biti 200.
- Odgovor treba sadržavati niz recenzija pod ključem data.

#### Test 3: Ažuriraj postojeću recenziju
- Cilj: Provjeriti API rutu za ažuriranje postojeće recenzije.
##### Opis:
1. Test prvo stvara recenziju s ocjenom 5 i komentarom "Great place!".
2. Zatim šalje PUT zahtjev na /reviews/{id} za ažuriranje ocjene na 4 i komentara na "Good place!".
3. Provodi se provjera statusnog koda (trebao bi biti 200 za uspješno ažuriranje).
4. Provodi se provjera da su podaci o recenziji ispravno ažurirani.
##### Očekivani rezultat:
- Statusni kod odgovora treba biti 200.
- Odgovor treba sadržavati ažurirane podatke o recenziji, uključujući novu ocjenu i komentar.

#### Test 4: Obriši postojeću recenziju
- Cilj: Provjeriti API rutu za brisanje postojeće recenzije.
##### Opis:
1. Test prvo stvara recenziju s ocjenom 5 i komentarom "Great place!".
2. Zatim šalje DELETE zahtjev na /reviews/{id} za brisanje recenzije.
3. Provodi se provjera statusnog koda (trebao bi biti 200 za uspješno brisanje).
4. Provodi se provjera da odgovor sadrži success: true i odgovarajuću poruku o brisanju.
##### Očekivani rezultat:
- Statusni kod odgovora treba biti 200.
- Odgovor treba sadržavati poruku o uspješnom brisanju recenzije.


### 4. **Testovi za korisnike**
Testovi za API rute koje omogućuju stvaranje korisnika, provjeru valjanosti podataka i provjeru postojanja korisničkog imena ili emaila.

Datoteke:
- `tests/backend/users/users.test.js` - Testiranje rute za korisnike, uključujući stvaranje korisnika, provjeru ponovljenih emailova i korisničkih imena.

Opis testova:


#### Test 1: Stvori novog korisnika
- Cilj: Provjeriti API rutu za stvaranje novog korisnika.
##### Opis:
1. Test šalje POST zahtjev na /users s podacima za novog korisnika, uključujući email, korisničko ime i lozinku.
2. Provodi se provjera statusnog koda (trebao bi biti 201 za uspješno stvaranje).
3. Provodi se provjera da odgovor sadrži success: true i data, te da stvoreni korisnik ima ispravan email i korisničko ime.
##### Očekivani rezultat:
- Statusni kod odgovora treba biti 201.
- Odgovor treba sadržavati podatke o novo stvorenom korisniku, uključujući email i korisničko ime.

#### Test 2: Nedostajuća polja
- Cilj: Provjeriti API rutu za stvaranje korisnika kada nedostaju potrebna polja.
##### Opis:
1. Test šalje POST zahtjev na /users samo s emailom, bez korisničkog imena i lozinke.
2. Provodi se provjera statusnog koda (trebao bi biti 400 za neispravan zahtjev).
3. Provodi se provjera da odgovor sadrži poruku o nedostajućim poljima.
##### Očekivani rezultat:
- Statusni kod odgovora treba biti 400.
- Odgovor treba sadržavati success: false i poruku Please provide all fields.


#### Test 3: Email već postoji
- Cilj: Provjeriti API rutu za stvaranje korisnika kada korisnik s istim emailom već postoji.
##### Opis:
1. Test prvo stvara korisnika s emailom test@example.com.
2. Zatim šalje POST zahtjev na /users s istim emailom, ali različitim korisničkim imenom i lozinkom.
3. Provodi se provjera statusnog koda (trebao bi biti 400 za neispravan zahtjev).
4. Provodi se provjera da odgovor sadrži poruku o postojećem emailu.
##### Očekivani rezultat:
- Statusni kod odgovora treba biti 400.
- Odgovor treba sadržavati poruku Email already exists!.

#### Test 4: Korisničko ime već postoji
- Cilj: Provjeriti API rutu za stvaranje korisnika kada korisničko ime već postoji.
##### Opis:
1. Test prvo stvara korisnika s korisničkim imenom testuser.
2. Zatim šalje POST zahtjev na /users s istim korisničkim imenom, ali različitim emailom i lozinkom.
3. Provodi se provjera statusnog koda (trebao bi biti 400 za neispravan zahtjev).
4. Provodi se provjera da odgovor sadrži poruku o postojećem korisničkom imenu.
##### Očekivani rezultat:
- Statusni kod odgovora treba biti 400.
- Odgovor treba sadržavati poruku Username already exists!.





## Frontend

### 1. **Testovi za Signup**
Testovi za funkcionalnost registracije korisnika.

Datoteke:
- `signup.test.jsx` - Testiranje renderiranja i funkcionalnosti signup forme.

Opis testova:

#### Test 1: Renderiranje signup forme
- Cilj: Provjeriti ispravno renderiranje signup forme.
##### Opis:
 1. Test provodi renderiranje signup forme.
 2. Provodi se provjera da li su svi potrebni elementi kao što su polja za unos imena, e-maila, lozinke i gumb za registraciju prisutni na stranici.
##### Očekivani rezultat:
 -Forma treba biti pravilno renderirana, s prisutnim svim potrebnim poljima i gumbom za registraciju.

#### Test 2: Provjera funkcionalnosti registracije
- Cilj: Provjeriti ispravno funkcioniranje signup forme.
##### Opis:
 1. Test simulira unos podataka u formu (ime, e-mail, lozinka) i šalje formu.
 2. Provodi se provjera da li je funkcionalnost registracije uspješno obavljena.
##### Očekivani rezultat:
 -Nakon slanja forme, korisnik bi trebao biti uspješno registriran.

### 2. **Testovi za Review List**
Testovi za funkcionalnost prikaza recenzija.

Datoteke:
- `reviewlist.test.jsx` - Testiranje prikaza recenzija.

Opis testova:

#### Test 1: Renderiranje liste recenzija
- Cilj: Provjeriti ispravno renderiranje liste recenzija.
##### Opis:
 1. Test provodi renderiranje komponente ReviewList koja prikazuje recenzije.
 2. Provodi se provjera da li su recenzije pravilno prikazane na stranici.
#####Očekivani rezultat:
 -Svi podaci o recenzijama trebaju biti ispravno prikazani na stranici.

### 3. **Testovi za Profile**
Testovi za profil korisnika.

Datoteke:
- `profile.test.jsx` - Testiranje prikaza i funkcionalnosti korisničkog profila.

Opis testova:

#### Test 1: Renderiranje korisničkog profila
- Cilj: Provjeriti ispravno renderiranje korisničkog profila.
##### Opis:
 1. Test provodi renderiranje komponente Profile s korisničkim podacima.
 2. Provodi se provjera da li su svi podaci o korisniku ispravno prikazani.
##### Očekivani rezultat:
 -Podaci korisničkog profila trebaju biti ispravno prikazani.

### 4. **Testovi za Navbar**
Testovi za navigacijski bar.

Datoteke:
- `navbar.test.jsx` - Testiranje funkcionalnosti i renderiranja navigacijskog bara.

Opis testova:

#### Test 1: Renderiranje navbar-a
- Cilj: Provjeriti ispravno renderiranje navbar-a.
##### Opis:
 1. Test provodi renderiranje navbar-a.
 2. Provodi se provjera da li navbar sadrži sve potrebne navigacijske linkove.
##### Očekivani rezultat:
- Navbar treba biti ispravno renderiran s prisutnim svim potrebnim navigacijskim linkovima.

### 5. **Testovi za Login**
Testovi za funkcionalnost prijave korisnika.

Datoteke:
 - `login.test.jsx` - Testiranje login forme.

Opis testova:

#### Test 1: Renderiranje login forme
 - Cilj: Provjeriti ispravno renderiranje login forme.
##### Opis:
 1. Test provodi renderiranje login forme.
 2. Provodi se provjera da li su svi potrebni elementi kao što su polja za unos e-maila i lozinke prisutni na stranici.
##### Očekivani rezultat:
 - Forma treba biti pravilno renderirana s prisutnim svim potrebnim poljima.

#### Test 2: Provjera funkcionalnosti prijave
 - Cilj: Provjeriti ispravno funkcioniranje login forme.
##### Opis:
 1. Test simulira unos podataka u formu (e-mail, lozinka) i šalje formu.
 2. Provodi se provjera da li je prijava uspješno obavljena.
##### Očekivani rezultat:
 - Nakon slanja forme, korisnik bi trebao biti uspješno prijavljen.

### 6. **Testovi za Category Review**
Testovi za prikazivanje recenzija po kategorijama.

Datoteke:
 - `categoryreview.test.jsx` - Testiranje kategorije i njezinih recenzija.

Opis testova:

#### Test 1: Renderiranje recenzija za kategoriju
 - Cilj: Provjeriti ispravno renderiranje recenzija prema kategorijama.
##### Opis:
 1. Test provodi renderiranje recenzija za određenu kategoriju.
 2. Provodi se provjera da li su recenzije ispravno prikazane za odabranu kategoriju.
##### Očekivani rezultat:
 - Recenzije za kategoriju trebaju biti ispravno prikazane.

### 7. **Testovi za Categories**
Testovi za kategorije.

Datoteke:
 - `categories.test.jsx` - Testiranje prikaza kategorija.

Opis testova:

#### Test 1: Prikazivanje kategorija nakon dohvaćanja podataka
 - Cilj: Provjeriti ispravan prikaz kategorija nakon dohvaćanja podataka.
##### Opis:
 1. Test šalje zahtjev za dohvaćanje kategorija.
 2. Provodi se provjera da li se kategorije pravilno prikazuju na stranici nakon dohvaćanja podataka.
##### Očekivani rezultat:
 - Kategorije trebaju biti prikazane nakon što se podaci uspješno dohvate.

### 8. **Testovi za App**
Testovi za glavni aplikacijski render.

Opis testova:

Datoteke:
- `app.test.jsx` - Testiranje glavne aplikacije.
#### Test 1: Renderiranje navbar-a i kategorija
 - Cilj: Provjeriti renderiranje navbar-a i kategorija.
##### Opis:
 1. Test provodi renderiranje aplikacije.
 2. Provodi se provjera da li su navbar i kategorije pravilno renderirani.
##### Očekivani rezultat:
 - Navbar i kategorije trebaju biti ispravno prikazani.

### 9. **Testovi za Add Review**
Testovi za dodavanje recenzija.

Datoteke:
 - `addreview.test.jsx` - Testiranje funkcionalnosti dodavanja recenzija.

Opis testova:

#### Test 1: Renderiranje forme za dodavanje recenzije
 - Cilj: Provjeriti ispravno renderiranje forme za dodavanje recenzije.
##### Opis:
 1. Test provodi renderiranje forme za dodavanje recenzije.
 2. Provodi se provjera da li su svi potrebni elementi forme prisutni, uključujući ocjenu, komentar, sliku i lokaciju.
##### Očekivani rezultat:
 - Forma za dodavanje recenzije treba biti ispravno renderirana.

#### Test 2: Dodavanje recenzije s postojećom lokacijom
 - Cilj: Provjeriti ispravno dodavanje recenzije s postojećom lokacijom.
##### Opis:
 1. Test simulira unos podataka u formu za recenziju (ocjena, komentar, slika, lokacija).
 2. Provodi se provjera da li je recenzija uspješno dodana.
##### Očekivani rezultat:
 - Recenzija treba biti uspješno dodana s postojećom lokacijom.

####Test 3: Dodavanje recenzije s novom lokacijom
 - Cilj: Provjeriti ispravno dodavanje recenzije s novom lokacijom.
##### Opis:
 1. Test simulira unos podataka u formu za recenziju i dodavanje nove lokacije.
 2. Provodi se provjera da li je nova lokacija uspješno dodana zajedno s recenzijom.
##### Očekivani rezultat:
 - Nova lokacija i recenzija trebaju biti uspješno dodani.

#### Test 4: Upravlja greškama prilikom dodavanja recenzije
 - Cilj: Provjeriti upravljanje greškama prilikom dodavanja recenzije.
##### Opis:
 1. Test simulira grešku pri dodavanju recenzije.
 2. Provodi se provjera da li je greška ispravno prikazana korisniku.
##### Očekivani rezultat:
 - Treba biti prikazana poruka o grešci prilikom dodavanja recenzije.




## Testiranje cijele aplikacije

