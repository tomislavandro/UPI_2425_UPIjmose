describe('Profil', () => {

    let user = {
        username: 'testuser22',
        email: 'testuser22@example.com',
        password: 'password123',
    };

    beforeEach(() => {
        cy.visit('http://localhost:5173/login');

        cy.get('#username').type(user.username);
        cy.get('#email').type(user.email);
        cy.get('#password').type(user.password);
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/profile'); // preusmjeravanje
    });

    afterEach(() => {
        // reset nakon testa
        cy.get('#username').clear().type(user.username); 
        cy.get('#email').clear().type(user.email);
        cy.get('#password').clear();
        cy.get("button[type='submit']").click();
    });

    it('treba ucitati profil sa poljima za kor. ime, email, i lozinku', () => {
        cy.wait(1000)
        cy.get('#username').should('have.value', user.username);
        cy.get('#email').should('have.value', user.email);
        cy.get('#password').should('be.empty');
    });

    it('treba azurirati profil uspjesno', () => {
        cy.wait(1000);
        cy.get('#username').clear().type('newusername');
        cy.get('#email').clear().type('newemail@example.com');

        cy.get('button[type="submit"]').click();

        cy.get('#username').should('have.value', 'newusername');
        cy.get('#email').should('have.value', 'newemail@example.com');
    });


    it('treba prikazati gresku ako ne uspije azuriranje podataka', () => {
        cy.get('form').then(($form) => {
            $form[0].noValidate = true; // Onemogućavamo HTML5 validaciju
        });

        cy.wait(1000)
        cy.get('#email').clear().type('invalidemail.com'); //krivi e-mail format
        
        cy.get('button[type="submit"]').click();
        
        cy.get('.error').should('contain', 'Email not in correct format');
    });

    it('treba uspjesno obrisati recenziju', () => {
        cy.wait(1000)
        cy.visit('http://localhost:5173/reviews/679014f3dd9a5189a1144e27');
        cy.get("#comment").type("Great place!");
        cy.get("#location").select("6790c762b8e11246a6dede7f");
        cy.get("button[type='submit']").click();
        cy.wait(1000)

        cy.visit('http://localhost:5173/profile');

        cy.get('.review-card').should('have.length.greaterThan', 0);
        cy.get('.delete-button').last().click();
        cy.get('.profile-container').should('not.contain', 'Great place!');
        
    });


    it('treba uspjesno urediti recenziju', () => {
        cy.wait(1000)
        cy.visit('http://localhost:5173/reviews/679014f3dd9a5189a1144e27');
        cy.get("#comment").type("Great place!");
        cy.get("#location").select("6790c762b8e11246a6dede7f");
        cy.get("button[type='submit']").click();
        cy.wait(1000)

        cy.visit('http://localhost:5173/profile');

        cy.get('.review-card').should('have.length.greaterThan', 0);
        cy.get('.edit-button').first().click();

        cy.get('#ocjena').clear().type('4');
        cy.get('#comment').clear().type('Not bad!');
  
        cy.contains('button', 'Spremi izmjene').click();

        cy.get('.review-card').first().should('contain', 'Not bad!');
        cy.get('.review-card').first().should('contain', '4');
    });
    

    it('treba uspjesno odjaviti korisnika', () => {
        cy.get('.logout-button').click();

        cy.url().should('eq', 'http://localhost:5173/login'); // preusmjeravanje
    });

});
