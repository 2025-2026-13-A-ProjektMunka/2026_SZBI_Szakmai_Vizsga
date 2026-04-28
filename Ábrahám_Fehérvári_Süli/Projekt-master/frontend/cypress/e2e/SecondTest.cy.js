describe('Homepage teszt', () => {
  it('Betölti az oldalt és tartalmaz szöveget', () => {
    cy.visit('http://localhost:5173')
    cy.get('[id="reg"]').click();
    cy.get('[id="email"]').type("pepe1600");
    cy.get('[id="username"]').type("pepe@gmail.com");
    cy.get('[id="password"]').type("pepe1200");
    cy.get('[id="confirm-password"]').type("pepe1200");
    cy.get('[id="letrehoz"]').click();
  })
})
