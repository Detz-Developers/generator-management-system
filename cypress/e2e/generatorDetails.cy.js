describe('Generator Details Page', () => {
  const generatorId = 'GN0002'; // Test generator ID

  beforeEach(() => {
    // Login or visit page directly
    cy.visit(`/generators/${generatorId}`);
  });

  it('should display generator header correctly', () => {
    // Wait until generator title loads
    cy.contains(`Generator ${generatorId}`, { timeout: 15000 }).should('be.visible');
  });

  it('should show generator information', () => {
    cy.get('h3').contains('Generator Information').should('be.visible');
    cy.get('p').contains('Serial Number', { timeout: 10000 }).should('exist');
    cy.get('p').contains('Status').should('exist');
  });

  it('should show service schedule and log service modal', () => {
    cy.get('h3').contains('Service Schedule').should('be.visible');

    // Open modal
    cy.contains('Log Service').click();
    cy.get('h2').contains('Service Details').should('be.visible');

    // Fill modal form
    cy.get('select[name="generatorId"]').select('gen1');
    cy.get('select[name="serviceType"]').select('Repair');
    cy.get('textarea[name="description"]').type('Test service description');
    cy.get('input[name="serviceDate"]').type('2025-08-28');
    cy.get('input[name="nextServiceDate"]').type('2025-09-28');
    cy.get('input[name="cost"]').type('1000');
    cy.get('textarea[name="notes"]').type('Technician test notes');

    // Submit form
    cy.contains('Log Service').click();
    cy.get('h2').contains('Service Details').should('not.exist');
  });

  it(' should switch between tabs', () => {
    // Service History tab
    cy.contains('Service History').click().should('have.class', 'bg-blue-500');

    // Repair Logs tab
    cy.contains('Repair Logs').click().should('have.class', 'bg-blue-500');
    cy.get('#2').should('exist');

    // Extracted Parts tab
    cy.contains('Extracted Parts').click().should('have.class', 'bg-blue-500');
    cy.get('#3').should('exist');
  });
});
