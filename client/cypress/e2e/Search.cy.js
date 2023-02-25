describe('Smoke Test', () => {
  it('can view the home page', () => {
    cy.visit('/SearchSchedule');
    cy.contains('Depart at');
  });
});