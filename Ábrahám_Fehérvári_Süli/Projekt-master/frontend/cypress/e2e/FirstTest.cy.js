describe('Homepage teszt', () => {
  it('Betölti az oldalt és tartalmaz szöveget', () => {
    cy.visit('http://localhost:5173')
    cy.get('[id="bejel"]').click();
    cy.get('[id="email"]').type("pepe@gmail.com");
    cy.get('[id="jelszo"]').type("pepe1200");
    cy.get('[id="belepgomb"]').click();
  })
})
