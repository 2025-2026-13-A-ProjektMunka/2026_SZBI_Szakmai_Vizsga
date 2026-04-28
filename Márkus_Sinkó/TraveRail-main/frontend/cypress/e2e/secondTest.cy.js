describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/register');
    cy.get('[id="firstName"]').type('Markus');
    cy.get('[id="lastName"]').type('Rego');
    cy.get('[id="email"]').type('xyy@gmail.com');
    cy.get('[id="password"]').type('rego');
    cy.get('[id="passwordConfirm"]').type('rego');
    cy.get('[id="regisztracio"]').click();
  })
})