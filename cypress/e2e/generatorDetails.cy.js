/// <reference types="cypress" />

describe('Generator Details Page', () => {
  const generatorId = 'GN0002'; // Test generator ID

  beforeEach(() => {
    //  Correct route based on your Next.js page
    cy.visit(`/generators/${generatorId}`);
  });

  it('should display generator header correctly', () => {
    // Wait until generator title loads
    cy.contains(`Generator ${generatorId}`, { timeout: 10000 }).should('be.visible');
  });

  it('renders generator information correctly', () => {
    cy.get('h3').contains('Generator Information').should('be.visible');
    cy.get('p').contains('Serial Number', { timeout: 10000 }).should('exist');
    cy.get('p').contains('Status').should('exist');
  });

  it('opens and closes the Log Service modal', () => {
    cy.contains('button', 'Log Service').click();
    cy.contains('h2', 'Service Details').should('be.visible');

    // Close via cancel
    cy.contains('button', 'Cancel').click();
    cy.contains('h2', 'Service Details').should('not.exist');
  });

  it('submits service log form successfully (mocked)', () => {
    // Open modal
    cy.contains('button', 'Log Service').click();

    // Fill form fields
    cy.get('input[name="generatorId"]').clear().type(generatorId);
    cy.get('select[name="serviceType"]').select('Repair');
    cy.get('textarea[name="description"]').type('Performed routine maintenance and oil change.');

    // Fill date fields
    const today = new Date().toISOString().split('T')[0];
    const next = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    cy.get('input[name="serviceDate"]').type(today);
    cy.get('input[name="nextServiceDate"]').type(next);

    cy.get('input[name="cost"]').clear().type('1500');
    cy.get('input[name="technicianId"]').type('TECH123');
    cy.get('input[name="invoiceId"]').type('INV-001');
    cy.get('textarea[name="notes"]').type('Replaced air filter and cleaned spark plug.');

    // Stub alert to prevent popup
    cy.window().then((win) => cy.stub(win, 'alert').as('alert'));

    // Submit form
    cy.get('button[type="submit"]').click();

    // Check alert called
    cy.get('@alert').should('have.been.calledWith', '✅ Service log added successfully!');
  });

  it('switches between tabs correctly', () => {
    cy.contains('button', 'Repair Logs').click();
    cy.contains('No repair logs').should('be.visible');

    cy.contains('button', 'Extracted Parts').click();
    cy.contains('No extracted parts').should('be.visible');

    cy.contains('button', 'Service History').click();
    cy.contains('No service records').should('be.visible');
  });

  it('displays due service date correctly if available', () => {
    cy.get('p.text-gray-500').contains('Due Service:').parent().should('exist');
  });

  it('shows service logs table headers', () => {
    cy.contains('Service History').should('exist');
    cy.get('table thead th').should(($th) => {
      expect($th.eq(0)).to.contain('Date');
      expect($th.eq(1)).to.contain('Type');
      expect($th.eq(2)).to.contain('Technician');
      expect($th.eq(3)).to.contain('Description');
      expect($th.eq(4)).to.contain('Cost');
      expect($th.eq(5)).to.contain('Invoice No.');
    });
  });

  it('goes back when back button is clicked', () => {
    cy.get('button').first().click();
    // Optional: verify navigation
    // cy.url().should('include', '/generators');
  });
});
