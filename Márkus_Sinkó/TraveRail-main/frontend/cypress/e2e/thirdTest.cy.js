// ...existing code...
describe('Viszonylat oldal - harmadik teszt', () => {
  it('megjeleníti a viszonylatot, Foglalás gombot és lenyitható részleteket', () => {
    const viszonylatok = [
      {
        allomasok: ['A', 'B', 'C'],
        idotartamAllomasig: ['0:00', '0:30', '1:00'],
        idopontok: ['08:00 (IC)', '12:30 (IC)'],
        induloallomas: 'A kezdő',
        celallomas: 'C cél',
        ar: 1000,
        jarat: 'ic',
        idotartam: '1:00'
      }
    ];

    cy.visit('http://localhost:5173/viszonylat', {
      onBeforeLoad(win) {
        win.localStorage.setItem('viszonylatok', JSON.stringify(viszonylatok));
        win.localStorage.setItem('honnan', JSON.stringify('A'));
        win.localStorage.setItem('hova', JSON.stringify('C'));
      }
    });

    // fejléc ellenőrzése
    cy.get('.cim').should('contain.text', 'A ↪  C');

    // állomások a bal oldalon
    cy.get('.bal-tarto').should('contain.text', 'A').and('contain.text', 'B').and('contain.text', 'C');

    // Foglalás gombok megjelennek
    cy.contains('button', 'Foglalás').should('exist');

    // Lenytható rész működése: katt, megjelenik, katt, eltűnik
    cy.get('.row-arrow').first().click();
    cy.get('.row-details').should('exist');
    cy.get('.row-details .details-header').should('contain.text', 'IC').and('contain.text', 'A kezdő → C cél');

    cy.get('.row-arrow').first().click();
    cy.get('.row-details').should('not.exist');
  });
});