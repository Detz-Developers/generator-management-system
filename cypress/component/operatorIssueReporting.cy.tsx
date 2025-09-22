/// <reference types="cypress" />
/// <reference types="chai" />
/// <reference types="mocha" />
/// <reference types="sinon" />

import React from 'react';
import { mount } from 'cypress/react';   // FIXED for React 
import sinon from 'sinon';
import OperatorIssueReporting from '../../frontend/src/components/operator/OperatorIssueReporting';

describe('OperatorIssueReporting component (sidebar-independent)', () => {
  /*beforeEach(() => {
    // Handle uncaught exceptions to prevent test failures
    cy.on('uncaught:exception', (err) => {
      console.error('Uncaught exception:', err);
      return false; // prevent Cypress from failing on app errors
    });
  });*/

  it('renders header and description', () => {
    const stubNavigate = sinon.stub();
    mount(<OperatorIssueReporting onNavigate={stubNavigate} />);
    cy.contains('h1', 'Issue Reporting').should('exist').and('be.visible');
    cy.contains('Report Your Breakdown').should('exist').and('be.visible');
  });

  it('allows typing in Gen ID input', () => {
    const stubNavigate = sinon.stub();
    mount(<OperatorIssueReporting onNavigate={stubNavigate} />);
    cy.get('label[for="gen-id"]').should('exist').and('contain', 'Gen ID');  // ✅ aligned
    cy.get('input#gen-id')
      .should('exist')
      .clear()
      .type('G12345')
      .should('have.value', 'G12345');
  });

  it('toggles Emergency and Battery switches', () => {
    const stubNavigate = sinon.stub();
    mount(<OperatorIssueReporting onNavigate={stubNavigate} />);
    
    cy.get('input#emergency').should('exist').and('be.checked');
    cy.get('input#emergency').click({ force: true }).should('not.be.checked');

    cy.get('input#battery-info').should('exist').and('be.checked');
    cy.get('input#battery-info').click({ force: true }).should('not.be.checked');
  });

  it('enters issue details', () => {
    const stubNavigate = sinon.stub();
    mount(<OperatorIssueReporting onNavigate={stubNavigate} />);
    cy.get('label[for="issue-details"]').should('exist').and('contain', 'Issue Details');
    cy.get('textarea#issue-details')
      .should('exist')
      .type('Generator stopped unexpectedly')
      .should('have.value', 'Generator stopped unexpectedly');
  });

  it('renders the issues table with rows and action buttons', () => {
    const stubNavigate = sinon.stub();
    mount(<OperatorIssueReporting onNavigate={stubNavigate} />);
    cy.contains('Recent Issue Assignment Table').should('exist');
    cy.get('table').should('exist').and('be.visible');
    cy.get('tbody tr').should('have.length', 4);
  });

  it('navigates on eye button click (calls onNavigate)', () => {
    const stubNavigate = sinon.stub();
    mount(<OperatorIssueReporting onNavigate={stubNavigate} />);

    cy.get('tbody tr').first().within(() => {
      cy.get('td').eq(6).find('button').first().click();
    });

    cy.wrap(stubNavigate).should('have.been.calledWith', 'Reports');
  });
});
