describe('Signup', () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/register");
    })

    it('treba uspjesno registrirati novog korisnika', () => {
        cy.get('#username').type('newuser');
        cy.get('#email').type('newuser@example.com');
        cy.get('#password').type('password123');

        cy.get('button[type="submit"]').click();

        cy.get('.success').should('contain', 'Registracija uspješna! Možete se prijaviti.');
    });

    it('treba prikazati gresku za postojece kor. ime ili email', () => {
        // Unesi postojeće korisničko ime ili e-mail
        cy.get('#username').type('testuser22');
        cy.get('#email').type('testuser22@example.com');
        cy.get('#password').type('password123');

        cy.get('button[type="submit"]').click();

        // Provjeri da se prikazuje poruka o grešci
        cy.get('.error').should("contain", "Email already exists!");
    });

});
