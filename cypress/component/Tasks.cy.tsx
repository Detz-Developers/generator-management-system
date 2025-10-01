/// <reference types="cypress" />

describe('Tasks Page', () => {
  beforeEach(() => {
    // Visit your TasksPage route (adjust URL if needed)
    cy.visit('http://localhost:3000/tasks');
  });

  it('displays the header and metrics cards', () => {
    cy.contains('Tasks').should('exist');
    cy.contains('Pending Tasks').should('exist');
    cy.contains('Completed').should('exist');
    cy.contains('Overdue').should('exist');
    cy.contains('Due Today').should('exist');
  });

  it('shows the task table with initial tasks', () => {
    cy.get('table').should('exist');
    cy.contains('T001').should('exist');
    cy.contains('Routine maintenance and oil change').should('exist');
    cy.contains('Sahan P.').should('exist');
  });

  it('filters tasks by search term', () => {
    cy.get('input[placeholder="Search tasks..."]').type('Battery');
    cy.contains('Battery replacement and system check').should('exist');
    cy.contains('Routine maintenance and oil change').should('not.exist');
  });

  it('filters tasks by status', () => {
    cy.get('select').first().select('Pending');
    cy.contains('Pending').should('exist');
    cy.contains('Completed').should('not.exist');
  });

  it('can open and close the Assign Task modal', () => {
    cy.contains('+ Assign Task').click();
    cy.contains('Assign Task').should('exist');
    cy.get('button').contains('Cancel').click();
    cy.contains('Assign Task').should('not.exist');
  });

  it('can view task details', () => {
    cy.contains('View').first().click();
    cy.contains('Task Details').should('exist');
    cy.contains('Task ID:').should('exist');
    cy.get('button').contains('X').click();
    cy.contains('Task Details').should('not.exist');
  });

  it('can toggle a task status (Complete <-> Reopen)', () => {
    // Check task T002 (pending)
    cy.contains('T002').parent().within(() => {
      cy.contains('Complete').click();
    });

    // Now it should show as "Reopen"
    cy.contains('T002').parent().within(() => {
      cy.contains('Reopen').should('exist');
    });
  });
});
