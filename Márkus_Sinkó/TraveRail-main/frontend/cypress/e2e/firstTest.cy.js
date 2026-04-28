describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('[id="email"]').type('rego@gmail.com');
    cy.get('[id="jelszo"]').type('rego');
    cy.get('[id="bejelentkezes"]').click();
  })
})