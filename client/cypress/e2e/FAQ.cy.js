describe('Smoke Test', () => {
    it('can view the FAQ page', () => {
        cy.visit('/FAQ');
        cy.contains('Frequently Asked Questions');
        cy.contains('How can I book?');
        cy.contains('turnkeys@uwaterloo.ca');
        cy.contains('WatCard?');
        cy.contains('519-888-4434');
    });
});