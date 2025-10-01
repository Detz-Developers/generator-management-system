// cypress/e2e/OperatorReports.cy.js

describe('OperatorReports Page', () => {
  beforeEach(() => {
    // Mock user profile in localStorage
    cy.window().then((win) => {
      win.localStorage.setItem('userProfile', JSON.stringify({ id: 'user1', shopId: 'shop1', name: 'Test Center' }));
    });

    // Mock Firebase data
    cy.intercept('GET', '**/generators*', { body: [
      { id: 'G001', serialNo: 'SN001', brand: 'BrandA', size: 'Large', status: 'Active', shopId: 'shop1' }
    ]});
    cy.intercept('GET', '**/issues*', { body: [
      { id: 'I001', equipmentId: 'G001', description: 'Issue 1', severity: 'High', status: 'Open', createdAt: Date.now() }
    ]});
    cy.intercept('GET', '**/serviceLogs*', { body: [
      { id: 'S001', generatorId: 'G001', serviceType: 'Maintenance', serviceDate: '2025-10-01', notes: 'Done' }
    ]});
    cy.intercept('GET', '**/savedReports*', { body: [] });

    // Visit the page
    cy.visit('/');
  });

  it('renders page header and center info', () => {
    cy.get('[data-cy=page-header]').should('contain', 'Reports');
    cy.get('[data-cy=reports-center]').should('contain', 'Own by This Center');
  });

  it('search input updates on typing', () => {
    cy.get('[data-cy=serial-search]').type('SN001').should('have.value', 'SN001');
  });

  it('renders generator list', () => {
    cy.get('[data-cy=generator-list]').should('exist');
    cy.get('[data-cy=generator-list] div').should('have.length.greaterThan', 0);
  });

  it('can click Generate Report button', () => {
    cy.get('[data-cy=generate-report]').click();
    cy.get('[data-cy=generate-report]').should('not.be.disabled');
  });

  it('can click Save Report button', () => {
    cy.get('[data-cy=save-report]').click();
    cy.get('[data-cy=save-report]').should('not.be.disabled');
  });

  it('Excel and PDF download buttons exist and clickable', () => {
    cy.get('[data-cy=download-excel]').click();
    cy.get('[data-cy=download-pdf]').click();
  });

  it('summary section is visible after report generation', () => {
    cy.get('[data-cy=summary-section]').should('exist');
  });

  it('opens and closes Report History modal', () => {
    cy.get('[title="Report History"]').click();
    cy.get('[data-cy=report-history-modal]').should('exist');
    cy.get('[data-cy=report-history-modal] button').first().click();
    cy.get('[data-cy=report-history-modal]').should('not.exist');
  });
});
