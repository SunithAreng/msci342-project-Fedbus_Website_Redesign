describe('Smoke Test', () => {
    it('can view the review page', () => {
        cy.visit('/Review');
        cy.contains('Add your Bus Review!');
        cy.contains('Enter Your Name');
        cy.contains('Enter Your Bus Review Title');
        cy.contains('Enter Your Bus Review');
        cy.contains('Bus Review Rating');
    });
});