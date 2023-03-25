describe('Smoke Test', () => {
  it('can view the home page', () => {
    cy.visit('/SearchSchedule');
    cy.contains('Depart at');
    cy.contains('Arrive by');
    cy.contains('One way');
    cy.contains('Round Trip');
    cy.contains('Depart on');
    cy.contains('Origin');
  });
});