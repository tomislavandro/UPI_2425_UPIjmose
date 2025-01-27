# Dokumentacija za testiranje aplikacije

# Backend

## 1. Opis backend aplikacije
Backend aplikacija pruža API rute za upravljanje kategorijama, korisnicima, recenzijama i lokacijama. Korišteni su **Node.js** i **Express.js** za izradu servera i API-ja, dok se podaci pohranjuju u **MongoDB** bazu podataka, kojoj pristupamo pomoću **Mongoose**.

## 2. Tehnologije i alati
- **Node.js**: Za backend server.
- **Express.js**: Za izradu API-ja i upravljanje HTTP zahtjevima.
- **MongoDB**: Za pohranu podataka.
- **Mongoose**: Za rad s MongoDB bazom podataka.
- **Jest**: Za testiranje backend funkcionalnosti.

## 3. Pokretanje testova
 Za pokretanje testova u glavnoj mapi projekta koristite naredbu: `npm test`

## 4. Opis testova:

### 1. **Testovi za kategorije**
Testovi za API rute koje omogućuju pregled svih kategorija i stvaranje novih kategorija.

Datoteka: `tests/category.test.js`
 - Testiranje rute za dohvat svih kategorija i stvaranje novih kategorija.

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

: `tests/locations/location.test.js`
- Testiranje rute za dodavanje, dohvat i ažuriranje lokacija.

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

Datoteka: `tests/review.test.js`
- Testiranje rute za stvaranje, dohvat, ažuriranje i brisanje recenzija.


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

Datoteka: `tests/user.test.js`
- Testiranje rute za korisnike, uključujući stvaranje korisnika, provjeru ponovljenih emailova i korisničkih imena.

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



# Frontend

## 1. Opis frontend aplikacije
Frontend aplikacija je izgrađena pomoću **React.js**, **React Router** i **Axios** za povezivanje s backend API-jem. Omogućuje korisnicima interakciju s aplikacijom kroz pregled kategorija, lokacija, recenzija i korisničkog profila, kao i dodavanje novih recenzija.

## 2. Tehnologije i alati
- **React.js**: Za izradu korisničkog sučelja i upravljanje stanjima.
- **React Router**: Za upravljanje navigacijom unutar aplikacije.
- **CSS**: Za stiliziranje korisničkog sučelja.
- **Jest**: Za testiranje frontend funkcionalnosti.

## 3. Pokretanje testova
1. Pokrenite aplikaciju u terminalu u glavnoj mapi projekta koristeći naredbu: `npm run all`
2. U drugoj kartici terminala u mapi `frontend/` koristite naredbu: `npm run test`

## 4. Opis testova

### 1. **Testovi za registraciju**
Testovi za funkcionalnost registracije korisnika.

Datoteka: `frontend/tests/signup.test.jsx`
- Testiranje renderiranja i funkcionalnosti registracijske forme.

#### Unit testovi:

#### Test 1: Renderiranje registracijske forme
- Cilj: Provjeriti ispravno renderiranje registracijske forme.
##### Opis:
 1. Test provodi renderiranje registracijske forme.
 2. Provodi se provjera jesu li svi potrebni elementi kao što su polja za unos imena, e-maila, lozinke i gumb za registraciju prisutni na stranici.
##### Očekivani rezultat:
 -Forma treba biti pravilno renderirana, s prisutnim svim potrebnim poljima i gumbom za registraciju.

#### Test 2: Provjera funkcionalnosti registracije
- Cilj: Provjeriti ispravno funkcioniranje registracijske forme.
##### Opis:
 1. Test simulira unos podataka u formu (ime, e-mail, lozinka).
 2. Provodi se provjera jesu li vrijednosti pravilno postavljene u inputima.
##### Očekivani rezultat:
 - Nakon popunjavanja forme, korisnik bi trebao moći unijeti podatke (ime, e-mail, lozinku) i odabrati opciju za registraciju.

#### Test 3: Navigacija na prijavu
 - Cilj: Provjeriti navigaciju kada korisnik klikne na "Prijavite se" link.
##### Opis:
 1. Test provodi klik na link "Prijavite se" koji treba voditi korisnika na stranicu za prijavu.
 2. Provodi se provjera URL-a kako bi se osigurao ispravan prijelaz.
##### Očekivani rezultat:
 - Klikom na link za prijavu korisnik treba biti preusmjeren na stranicu za prijavu.

#### Integracijski testovi:

#### Test 1: Slanje forme s uspješnim odgovorom
 - Cilj: Provjeriti ispravno slanje signup forme s uspješnim odgovorom od servera.
##### Opis:
 1. Test simulira unos podataka i slanje signup forme.
 2. Provodi se provjera da li je fetch pozvan ispravno, te da li je odgovor od servera uspješan.
 3. Provodi se provjera je li korisnik obaviješten o uspješnoj registraciji.
##### Očekivani rezultat:
 - Nakon uspješne registracije, korisnik bi trebao vidjeti poruku o uspješnoj registraciji.

#### Test 2: Prikazivanje greške kada su polja prazna
 - Cilj: Provjeriti ispravno prikazivanje greške kada se forma šalje s praznim poljima.
##### Opis:
 1. Test šalje formu s praznim poljima i provodi provjeru odgovora od servera.
 2. Provodi se provjera da li server vraća grešku zbog praznih polja i da li se greška prikazuje korisniku.
##### Očekivani rezultat:
 - Kada se šalje forma s praznim poljima, server treba vratiti odgovarajuću grešku, i korisnik treba vidjeti poruku o grešci.

### 2. **Testovi za Review List**
Testovi za funkcionalnost prikaza recenzija.

Datoteka: `frontend/tests/reviewlist.test.jsx`
- Testiranje prikaza recenzija.

#### Unit testovi:

#### Test 1: Renderiranje liste recenzija kada nema recenzija u kategoriji
 - Cilj: Provjeriti ispravno renderiranje liste recenzija.
##### Opis:
 1. Test provodi renderiranje komponente ReviewList koja prikazuje recenzije.
 2. Provodi se provjera da li su recenzije pravilno prikazane na stranici.
#####Očekivani rezultat:
 -Svi podaci o recenzijama trebaju biti ispravno prikazani na stranici.

#### Test 2: Renderiranje recenzija za specifičnu kategoriju
 - Cilj: Provjeriti ispravno renderiranje recenzija za određenu kategoriju.
##### Opis: 
 1. Testira se renderiranje komponente ReviewList koja prikazuje recenzije specifične za kategoriju. 
 2. Provodi se provjera da li se ispravno prikazuju samo recenzije povezane s tom kategorijom.
##### Očekivani rezultat: 
 - Recenzije za određenu kategoriju trebaju biti ispravno renderirane, dok se recenzije iz drugih kategorija ne prikazuju.

#### Funkcionalni testovi:

#### Test 1: Funkcionalnost - Broj recenzija
 - Cilj: Provjeriti broj recenzija koje se renderiraju.
##### Opis:
 1. Test provodi renderiranje liste recenzija s tri recenzije. 
 2. Provodi se provjera da li je točan broj recenzija prikazan na stranici.
##### Očekivani rezultat:
 - Trebalo bi se ispravno prikazati 3 recenzije, tj. broj review-item elemenata treba biti 3.

#### Test 2: CSS klase
 - Cilj: Provjeriti jesu li CSS klase pravilno primijenjene.
##### Opis:
 1. Test provodi renderiranje liste recenzija.
 2. Provodi se provjera da li se primjenjuju ispravne CSS klase na glavnu listu i 
 3. pojedinačne recenzije.
##### Očekivani rezultat:
 - CSS klase trebaju biti ispravno primijenjene na odgovarajuće elemente.

### 3. **Testovi za Profile**
Testovi za profil korisnika.

Datoteka: `frontend/tests/profile.test.jsx`
- Testiranje prikaza i funkcionalnosti korisničkog profila.

#### Funkcionalni testovi:

#### Test 1: Renderiranje korisničkog profila
 - Cilj: Provjeriti ispravno renderiranje korisničkog profila.
##### Opis:
 1. Test provodi renderiranje komponente Profile s korisničkim podacima.
 2. Provodi se provjera da li su svi podaci o korisniku ispravno prikazani.
##### Očekivani rezultat:
 -Podaci korisničkog profila trebaju biti ispravno prikazani.

#### Test 2: Prikaz recenzija korisnika
 - Cilj: Provjeriti ispravan prikaz recenzija korisnika.
##### Opis:
 1. Testira se renderiranje komponente Profile s korisničkim podacima i recenzijama.
 2. Provodi se provjera da li su recenzije ispravno prikazane.
##### Očekivani rezultat:
 - Svi podaci o recenzijama korisnika, uključujući naziv lokacije, ocjenu i komentar, trebaju biti ispravno prikazani.

#### Test 3: Brisanje recenzije
 - Cilj: Provjeriti da li se recenzija briše kada korisnik pritisne odgovarajući gumb.
##### Opis:
 1. Testira se brisanje recenzije nakon što korisnik pritisne gumb za brisanje.
 2. Provodi se provjera da li se recenzija uklonila s liste nakon brisanja.
##### Očekivani rezultat:
 - Recenzija bi trebala nestati s liste nakon brisanja.

#### Test 4: Uređivanje recenzije
 - Cilj: Provjeriti da li korisnik može urediti recenziju i ažurirati je.
##### Opis:
 1. Testira se uređivanje postojeće recenzije (promjena komentara i ocjene).
 2. Provodi se provjera da li je uređeni komentar i ocjena pravilno ažurirana.
##### Očekivani rezultat:
 - Komentar i ocjena trebaju biti ažurirani prema korisnikovim izmjenama.

#### Integracijski testovi:

#### Test 1: Ažuriranje korisničkih podataka
 - Cilj: Provjeriti da li se korisnički podaci mogu ažurirati putem forme.
##### Opis:
 1. Testira se slanje forme za ažuriranje korisničkih podataka (username, email).
 2. Provodi se provjera da li je API poziv za ažuriranje korisničkih podataka ispravno pozvan.
##### Očekivani rezultat:
 - Podaci o korisniku trebaju biti uspješno ažurirani putem API poziva.

#### End-to-end testovi:

#### Test 6: Odjava korisnika
 - Cilj: Provjeriti ispravnu funkcionalnost odjave korisnika.
##### Opis:
 1. Testira se odjava korisnika putem odgovarajućeg gumba.
 2. Provodi se provjera da li je API poziv za odjavu korisnika ispravno pozvan.
##### Očekivani rezultat:
 - Korisnik treba biti odjavljen i API poziv za odjavu treba biti ispravno izvršen.

### 4. **Testovi za Navbar**
Testovi za navigacijski bar.

Datoteka: `frontend/tests/navbar.test.jsx`
- Testiranje funkcionalnosti i renderiranja navigacijskog bara.


#### Funkcionalni testovi:

#### Test 1: Renderiranje navbar-a
- Cilj: Provjeriti ispravno renderiranje navbar-a.
##### Opis:
 1. Test provodi renderiranje navbar-a.
 2. Provodi se provjera da li navbar sadrži sve potrebne navigacijske linkove.
##### Očekivani rezultat:
- Navbar treba biti ispravno renderiran s prisutnim svim potrebnim navigacijskim linkovima.

#### Test 2: Renderiranje navbar-right s ispravnom dijecom
 - Cilj: Provjeriti da je komponenta navbar-right ispravno renderirana s potrebnim dijelom (linkovima za prijavu i korisnički profil).
##### Opis:
1. Testira se da li komponenta navbar-right u navigacijskom baru sadrži ispravne elemente, tj. linkove za prijavu i korisnički profil.
##### Očekivani rezultat:
 - Komponenta navbar-right treba biti prisutna i sadržavati linkove za Prijava i korisnički profil.
 - Provjera da li roditeljski element (div) koji okružuje te linkove ima klasu navbar-right

#### Unit testovi:

#### Test 1: Linkovi imaju točne href atribute
 - Cilj: Provjeriti da li linkovi u navigacijskom baru imaju točne href atribute koji vode na ispravne rute.
##### Opis:
 1. Testira se da li su svi linkovi u navigacijskom baru postavljeni s ispravnim href atributima koji vode na odgovarajuće stranice
##### Očekivani rezultat:
 - Svaki link u navigacijskom baru treba imati ispravan href atribut koji odgovara ispravnoj ruti aplikacije.

#### Test 2: nav traka ima ispravnu CSS klasu
 - Cilj: Provjeriti da li je glavna navigacijska traka (<nav>) ispravno označena s odgovarajućom CSS klasom.
##### Opis:
 1. Testira se da li <nav> element u navigacijskom baru ima klasu navbar, koja označava glavnu stiliziranu traku navigacije.
##### Očekivani rezultat:
 - nav element mora imati CSS klasu navbar, što omogućava stiliziranje navigacijske trake prema dizajnu aplikacije.

### 5. **Testovi za Login**
Testovi za funkcionalnost prijave korisnika.

Datoteka: `frontend/tests/login.test.jsx`
- Testiranje login forme.


#### Unit testovi:

#### Test 1: Renderiranje login forme
 - Cilj: Provjeriti ispravno renderiranje login forme.
##### Opis:
 1. Test provodi renderiranje login forme.
 2. Provodi se provjera da li su svi potrebni elementi kao što su polja za unos e-maila i lozinke prisutni na stranici.
##### Očekivani rezultat:
 - Forma treba biti pravilno renderirana s prisutnim svim potrebnim poljima.

#### Test 2: Provjera funkcionalnosti forme
 - Cilj: Provjeriti da korisnik može unijeti podatke u formu.
##### Opis:
 1. Test simulira unos podataka u formu (e-mail, lozinka) i provjerava da li su podaci ispravno postavljeni.
##### Očekivani rezultat:
 - Podaci trebaju biti ispravno uneseni u odgovarajuća polja forme.

#### Test 3: Provjera prijave sa praznim poljima
 - Cilj: Provjeriti funkcionalnost prijave kada se forma pošalje s praznim poljima.
##### Opis:
 1. Test simulira slanje forme s praznim poljima i provodi provjeru odgovora s greškom.
##### Očekivani rezultat:
 - Greška se prikazuje ako su polja prazna.

#### Test 4: Navigacija na registracijsku stranicu
 - Cilj: Provjeriti navigaciju prema registracijskoj stranici.
##### Opis:
 1. Test provodi klik na "Registrirajte se" link i provjerava da li se korisnik preusmjerava na stranicu za registraciju.
##### Očekivani rezultat:
 - Link treba ispravno preusmjeriti na stranicu za registraciju.

#### Integracijski testovi:

#### Test 5: Slanje uspješne prijave
 - Cilj: Provjeriti uspješnu prijavu korisnika.
##### Opis:
 1. Test simulira unos podataka u formu (e-mail, lozinka) i slanje forme.
 2. Provodi se provjera uspješne prijave putem API poziva.
##### Očekivani rezultat:
 - Nakon uspješne prijave, korisnik bi trebao biti preusmjeren ili prikazati uspješnu poruku.


### 6. **Testovi za Category Review**
Testovi za prikazivanje recenzija po kategorijama.

Datoteka: `frontend/tests/categoryreview.test.jsx`
 - Testiranje kategorije i njezinih recenzija.


#### Unit testovi:

#### Test 1: Renderiranje recenzija za kategoriju
 - Cilj: Provjeriti ispravno renderiranje recenzija prema kategorijama.
##### Opis:
 1. Test provodi renderiranje recenzija za određenu kategoriju.
 2. Provodi se provjera da li su recenzije ispravno prikazane za odabranu kategoriju.
##### Očekivani rezultat:
 - Recenzije za kategoriju trebaju biti ispravno prikazane.

#### Integracijski testovi:

#### Test 1: Dodavanje nove recenzije
 - Cilj: Provjeriti uspješno dodavanje nove recenzije kroz formu.
##### Opis:
 1. Test omogućuje korisniku da ispuni formu za dodavanje recenzije, uključujući odabir ocjene, komentara, slike i lokacije.
 2. Provodi se provjera da li je recenzija uspješno dodana i prikazana na stranici.
##### Očekivani rezultat:
 - Nova recenzija trebala bi biti prikazana na stranici nakon što je forma uspješno poslana.

#### Funkcionalni testovi:

#### Test 1: Prikazivanje greške prilikom slanja forme bez lokacije
 - Cilj: Provjeriti ispravno ponašanje aplikacije u slučaju kada korisnik nije odabrao lokaciju prilikom slanja forme.
##### Opis:
 1. Test simulira situaciju u kojoj korisnik ispunjava formu za recenziju, ali ne odabire lokaciju.
 2. Provodi se provjera da li se pojavljuje poruka o grešci koja obavještava korisnika da je lokacija obavezna.
##### Očekivani rezultat:
 - Trebala bi se prikazati poruka s greškom koja korisniku govori da je potrebno odabrati lokaciju.

#### Test 2: Prikazivanje poruke kada nema recenzija
 - Cilj: Provjeriti ispravno ponašanje kada za određenu kategoriju ne postoji niti jedna recenzija.
##### Opis:
 1. Test provodi provjeru da li se u slučaju kada nema recenzija za kategoriju, prikazuje odgovarajuća poruka.
 2. Provodi se provjera da li aplikacija ispravno prikazuje informaciju o tome da nema recenzija.
##### Očekivani rezultat:
 - Aplikacija bi trebala prikazati poruku poput "Nema recenzija za ovu kategoriju".

#### Test 3: Prikazivanje recenzije nakon dodavanja svih obaveznih opcija
 - Cilj: Provjeriti da li se recenzija uspješno dodaje i prikazuje nakon što su svi obavezni podaci ispunjeni.
##### Opis:
 1. Test simulira uspješno ispunjenu formu u kojoj su svi obavezni podaci uključeni (ocjena, komentar, slika, lokacija).
 2. Provodi se provjera da li se nova recenzija uspješno prikazuje na stranici.
##### Očekivani rezultat:
 - Recenzija treba biti prikazana s ispravnim podacima nakon uspješnog slanja forme.

#### Test 4: Renderiranje forme za dodavanje recenzije
 - Cilj: Provjeriti ispravno renderiranje forme za dodavanje nove recenzije.
##### Opis:
 1. Test provodi renderiranje stranice s formom za dodavanje recenzije.
 2. Provodi se provjera da li je forma pravilno prikazana, uključujući potrebne elemente poput input polja i gumba za slanje.
##### Očekivani rezultat:
 - Forma za dodavanje recenzije treba biti ispravno renderirana, uključujući sve potrebne elemente za unos podataka.

### 7. **Testovi za Categories**
Testovi za kategorije.

Datoteka: `frontend/tests/categories.test.jsx`
 - Testiranje prikaza kategorija.

#### Unit testovi:

#### Test 1: Renderiranje bez pogrešaka
 - Cilj: Provjeriti ispravno renderiranje komponente bez pogrešaka.
##### Opis:
 1. Test provodi renderiranje početne stranice.
 2. Provodi se provjera da li je naziv "Kategorije" prisutan na stranici.
##### Očekivani rezultat:
 - Tekst "Kategorije" treba biti prikazan na stranici, što znači da je komponenta uspješno renderirana.

#### Funkcionalni testovi:

#### Test 1: Prikazivanje kategorija nakon dohvaćanja podataka
 - Cilj: Provjeriti ispravan prikaz kategorija nakon dohvaćanja podataka.
##### Opis:
 1. Test šalje zahtjev za dohvaćanje kategorija.
 2. Provodi se provjera da li se kategorije pravilno prikazuju na stranici nakon dohvaćanja podataka.
##### Očekivani rezultat:
 - Kategorije trebaju biti prikazane nakon što se podaci uspješno dohvate.

#### Integracijski testovi:

#### Test 1: Navigacija na stranicu recenzija nakon klika na kategoriju
 - Cilj: Provjeriti ispravan preusmjeravanje na stranicu recenzija kada se klikne na kategoriju.
##### Opis:
 1. Test šalje zahtjev za dohvaćanje kategorija.
 2. Provodi se provjera da li klik na gumb kategorije preusmjerava korisnika na stranicu recenzija.
##### Očekivani rezultat:
 - Nakon klika na gumb kategorije, korisnik treba biti preusmjeren na stranicu recenzija, gdje će vidjeti tekst "Pregled recenzija".

### 8. **Testovi za App**
Testovi za glavni aplikacijski render.

Datoteka: `frontend/tests/app.test.jsx`
- Testiranje glavne aplikacije.


#### Funkcionalni testovi:

#### Test 1: Renderiranje navbar-a i kategorija
 - Cilj: Provjeriti renderiranje navbar-a i kategorija.
##### Opis:
 1. Test provodi renderiranje aplikacije.
 2. Provodi se provjera da li su navbar i kategorije pravilno renderirani.
##### Očekivani rezultat:
 - Navbar i kategorije trebaju biti ispravno prikazani.

#### Test 2: Renderiranje login stranice
 - Cilj: Provjeriti da se ispravno prikazuje stranica za prijavu kada se klikne na link.
##### Opis:
 1. Test provodi klik na link za prijavu.
 2. Provodi se provjera da li se prikazuje stranica za prijavu.
##### Očekivani rezultat:
 - Stranica za prijavu treba biti ispravno prikazana.

#### Test 3: Renderiranje registracijske stranice
 - Cilj: Provjeriti da se ispravno prikazuje stranica za registraciju kada se klikne na link.
##### Opis:
 1. Test provodi klik na link za registraciju.
 2. Provodi se provjera da li se prikazuje stranica za registraciju.
##### Očekivani rezultat:
 - Stranica za registraciju treba biti ispravno prikazana.

#### Test 4: Renderiranje korisničkog profila
 - Cilj: Provjeriti ispravan prikaz korisničkog profila nakon prijave.
##### Opis:
 1. Test simulira kolačić za prijavljenog korisnika.
 2. Provodi se provjera da li je korisnički profil ispravno prikazan.
##### Očekivani rezultat:
 - Korisnički profil treba biti ispravno prikazan nakon što je korisnik prijavljen.

### 9. **Testovi za Add Review**
Testovi za dodavanje recenzija.

Datoteka: `frontend/tests/addreview.test.jsx`
 - Testiranje funkcionalnosti dodavanja recenzija.

#### Funkcionalni testovi:

#### Test 1: Renderiranje forme za dodavanje recenzije
 - Cilj: Provjeriti ispravno renderiranje forme za dodavanje recenzije.
##### Opis:
 1. Test provodi renderiranje forme za dodavanje recenzije.
 2. Provodi se provjera da li su svi potrebni elementi forme prisutni, uključujući ocjenu, komentar, sliku i lokaciju.
##### Očekivani rezultat:
 - Forma za dodavanje recenzije treba biti ispravno renderirana.

#### Integracijski testovi:

#### Test 1: Dodavanje recenzije s postojećom lokacijom
 - Cilj: Provjeriti ispravno dodavanje recenzije s postojećom lokacijom.
##### Opis:
 1. Test simulira unos podataka u formu za recenziju (ocjena, komentar, slika, lokacija).
 2. Provodi se provjera da li je recenzija uspješno dodana.
##### Očekivani rezultat:
 - Recenzija treba biti uspješno dodana s postojećom lokacijom.

#### Test 2: Dodavanje recenzije s novom lokacijom
 - Cilj: Provjeriti ispravno dodavanje recenzije s novom lokacijom.
##### Opis:
 1. Test simulira unos podataka u formu za recenziju i dodavanje nove lokacije.
 2. Provodi se provjera da li je nova lokacija uspješno dodana zajedno s recenzijom.
##### Očekivani rezultat:
 - Nova lokacija i recenzija trebaju biti uspješno dodani.

#### Testovi upravljanja greškama

#### Test 1: Upravlja greškama prilikom dodavanja recenzije
 - Cilj: Provjeriti upravljanje greškama prilikom dodavanja recenzije.
##### Opis:
 1. Test simulira grešku pri dodavanju recenzije.
 2. Provodi se provjera da li je greška ispravno prikazana korisniku.
##### Očekivani rezultat:
 - Treba biti prikazana poruka o grešci prilikom dodavanja recenzije.

# Testiranje cijele aplikacije


## 1. Opis aplikacije
Aplikacija koristi **MERN stack** (MongoDB, Express.js, React.js, Node.js) za pružanje funkcionalnosti korisnicima. Omogućuje registraciju, prijavu, pregled profila, dodavanje, uređivanje i brisanje recenzija, kao i upravljanje kategorijama i lokacijama. Aplikacija je dizajnirana kako bi omogućila korisnicima jednostavno iskustvo pregledavanja i interakcije s podacima, te je testirana kroz end-to-end testove kako bi se osigurala ispravnost svih funkcionalnosti.

## 2. Tehnologije i alati
- **MongoDB**: Za pohranu podataka.
- **Mongoose**: Za rad s MongoDB bazom podataka.
- **Express.js**: Za izradu API-ja i upravljanje HTTP zahtjevima.
- **Node.js**: Za backend server.
- **React.js**: Za izradu frontend sučelja.
- **Cypress**: Za end-to-end testiranje cijele aplikacije.


## 3. Pokretanje testova
Za pokretanje end-to-end testova u aplikaciji koristi se **Cypress**.
1. U `frontend/` mapi projekta pokrenite sljedeću naredbu: `npx cypress open` .
2. U drugoj kartici terminala u glavnoj mapi projekta pokrenite naredbu `npm run all` za pokretanje cijele aplikacije.
3. Kada se otvori Cypress aplikacija, odaberite End-to-end testing.
4. Odaberite preglednik u kojem želite testirati i nastavite dalje.
5. Odaberite koju od 3 datoteke žeite testirati klikom na pojedinu test datoteku.


### 1: **Testovi za prijavu korisnika**
Testovi za provjeru funkcionalnosti prijave korisnika na aplikaciju.

Datoteka: `frontend/cypress/e2e/login.cy.jsx`
 - Testiranje funkcionalnosti prijave.

#### Test 1: Uspješna prijava s točnim korisničkim podacima
 - Cilj: Provjeriti ispravnost prijave korisnika s točnim podacima.
##### Opis:
1. Prije svakog testa, aplikacija se otvara na login stranici korištenjem cy.visit('http://localhost:5173/login');.
2. Test unosi sljedeće podatke u polja:
- Korisničko ime: "testuser22"
- Email: "testuser22@example.com"
- Lozinka: "password123"
3. Klikom na gumb za prijavu (button[type="submit"]), simulira se slanje podataka.
4. Provjerava se preusmjerava li aplikacija korisnika na stranicu profila (provjera URL-a koji treba sadržavati /profile).
##### Očekivani rezultat:
-Korisnik se uspješno prijavljuje.
- URL sadrži /profile.


#### Test 2: Prikaz greške s netočnim korisničkim podacima
 - Cilj: Provjeriti odgovarajuću validaciju i poruku greške kada se unesu netočni podaci.
##### Opis:
1. Prije svakog testa, aplikacija se otvara na login stranici korištenjem cy.visit('http://localhost:5173/login');.
2. Test unosi sljedeće netočne podatke u polja:
- Korisničko ime: "wronguser"
- Email: "wronguser@example.com"
- Lozinka: "wrongpassword"
3. Klikom na gumb za prijavu (button[type="submit"]), simulira se slanje podataka.
  Provjerava se prikaz odgovarajuće poruke greške na stranici (element .error treba sadržavati "Invalid email or password").
##### Očekivani rezultat:
- Prikazuje se poruka greške: "Invalid email or password".
- Korisnik ostaje na login stranici.


### 2: **Testovi za profil korisnika**
Testovi za provjeru funkcionalnosti stranice profila korisnika.

Datoteka: `frontend/cypress/e2e/profile.cy.jsx`
 - Testiranje funkcionalnosti profila.

#### Test 1: Učitaj profil s poljima za korisničko ime, email i lozinku
 - Cilj: Provjeriti ispravnost učitavanja podataka na stranici profila.
##### Opis:
1. Prije svakog testa, korisnik se prijavljuje na aplikaciju.
2. Provjerava se sadrže li polja sljedeće vrijednosti:
- Korisničko ime: "testuser22"
- Email: "testuser22@example.com"
- Lozinka: prazno polje.
##### Očekivani rezultat:
- Polje za korisničko ime sadrži "testuser22".
- Polje za email sadrži "testuser22@example.com".
- Polje za lozinku je prazno.


#### Test 2: Ažuriranje profila
 - Cilj: Provjeriti funkcionalnost ažuriranja korisničkih podataka.
##### Opis:
1. Korisnik mijenja korisničko ime u "newusername" i email u "newemail@example.com".
2. Klikom na gumb za spremanje, podaci se ažuriraju.
3. Provjerava se je li ažuriranje uspješno.
##### Očekivani rezultat:
- Polje za korisničko ime sadrži "newusername".
- Polje za email sadrži "newemail@example.com".

#### Test 3: Prikaz greške pri neuspjelom ažuriranju podataka
 - Cilj: Provjeriti prikaz poruke greške kada unos nije ispravan.
##### Opis:
1. Korisnik unosi neispravan email ("invalidemail.com").
2. Klikom na gumb za spremanje, podaci se šalju.
3. Provjerava se prikaz poruke greške (element .error).
##### Očekivani rezultat:
- Prikazuje se poruka greške: "Email not in correct format".
- Korisnik ostaje na stranici profila.

#### Test 4: Brisanje recenzije
 - Cilj: Provjeriti funkcionalnost brisanja recenzija na profilu.
##### Opis:
1. Korisnik posjećuje stranicu za recenzije i dodaje novu recenziju.
2. Povratkom na profil, provjerava se je li recenzija prikazana.
3. Korisnik klikne na gumb za brisanje zadnje recenzije.
4. Provjerava se da recenzija više nije prisutna na profilu.
##### Očekivani rezultat:
- Recenzija se uspješno briše.
- Stranica profila ne sadrži obrisanu recenziju.

#### Test 5: Uređivanje recenzije
 - Cilj: Provjeriti funkcionalnost uređivanja recenzija.
##### Opis:
1. Korisnik posjećuje stranicu za recenzije i dodaje novu recenziju.
2. Povratkom na profil, provjerava se je li recenzija prikazana.
3. Korisnik klikne na gumb za uređivanje recenzije i unosi sljedeće izmjene:
- Ocjena: "4"
- Komentar: "Not bad!"
4. Klikom na gumb za spremanje izmjena, provjerava se je li recenzija ažurirana.
##### Očekivani rezultat:
- Recenzija prikazuje izmijenjene podatke: "Not bad!" i "4".

#### Test 6: Odjava korisnika
 - Cilj: Provjeriti funkcionalnost odjave korisnika.
##### Opis:
1. Korisnik klikne na gumb za odjavu.
2. Provjerava se je li korisnik preusmjeren na login stranicu.
##### Očekivani rezultat:
- Korisnik je preusmjeren na login stranicu (http://localhost:5173/login).


### 3: **Testovi za registraciju korisnika**
Testovi za provjeru funkcionalnosti registracije korisnika.

Datoteka: `frontend/cypress/e2e/signup.cy.jsx`
 -  Testiranje funkcionalnosti registracije korisnika.

#### Test 1: Uspješna registracija novog korisnika
 - Cilj:  Provjeriti ispravnost registracije s točnim podacima.
##### Opis:
1. Prije svakog testa, aplikacija se otvara na stranici za registraciju korištenjem cy.visit('http://localhost:5173/register');.
2. Test unosi sljedeće podatke u polja:
- Korisničko ime: "newuser"
- Email: "newuser@example.com"
- Lozinka: "password123"
3. Klikom na gumb za registraciju (button[type="submit"]), simulira se slanje podataka.
4. Provjerava se prikaz uspješne poruke (element .success treba sadržavati "Registracija uspješna! Možete se prijaviti.").
##### Očekivani rezultat:
- Korisnik se uspješno registrira.
- Prikazuje se poruka: "Registracija uspješna! Možete se prijaviti.".

#### Test 2: Prikaz greške za postojeće korisničko ime ili email
 - Cilj: Provjeriti validaciju i prikaz greške pri unosu postojećih podataka.
##### Opis:
1. Prije svakog testa, aplikacija se otvara na stranici za registraciju korištenjem cy.visit('http://localhost:5173/register');.
2. Test unosi sljedeće podatke u polja:
- Korisničko ime: "testuser22"
- Email: "testuser22@example.com"
- Lozinka: "password123"
3. Klikom na gumb za registraciju (button[type="submit"]), simulira se slanje podataka.
4. Provjerava se prikaz poruke greške (element .error treba sadržavati "Email already exists!").
##### Očekivani rezultat:
- Prikazuje se poruka greške: "Email already exists!".
- Korisnik ostaje na stranici za registraciju.
