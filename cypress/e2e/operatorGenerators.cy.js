describe('Operator - Generators page', () => {
  const goToGenerators = () => {
    cy.visit('/operator');
    cy.contains('button', 'Generators').click();
    cy.contains('Available Generators').should('be.visible');
  };

  it('renders heading and generator list', () => {
    goToGenerators();
    cy.contains('Own by this center').should('exist');
    cy.contains('Generator G00281').should('exist');
  });

  it('filters by generator id', () => {
    goToGenerators();
    cy.get('input[placeholder="Serial Number"]').type('G06723');
    cy.contains('Generator G06723').should('exist');
    cy.contains('Generator G00281').should('not.exist');
  });

  it('toggles With Battery / Without Battery', () => {
    goToGenerators();
    cy.contains('Without Battery').click();
    cy.contains('Generator G02380').should('exist');
    cy.contains('Generator G00281').should('not.exist');
  });

  it('opens and closes date picker', () => {
    goToGenerators();
    cy.contains('Date').parent().find('button').click();
    cy.contains('Cancel').should('exist');
    cy.contains('Cancel').click();
    cy.contains('Cancel').should('not.exist');
  });
});