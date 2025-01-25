describe('Login testovi', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
    });

    it('treba se uspjesno prijaviti sa tocnim korisnickim podacima', () => {
        cy.get('#username').type('testuser');
        cy.get('#email').type('testuser@example.com');
        cy.get('#password').type('password123');

        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/profile');  // Provjeri je li URL preusmjeren na profil
    });

    it('treba prikazati gresku sa netocnim korisnickim podacima', () => {
        // Unesi pogrešne podatke
        cy.get('#username').type('wronguser');
        cy.get('#email').type('wronguser@example.com');
        cy.get('#password').type('wrongpassword');

        cy.get('button[type="submit"]').click();

        cy.get('.error').should('contain', 'Invalid email or password');
    });
});
