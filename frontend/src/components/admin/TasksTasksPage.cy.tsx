import React from 'react'
import TasksPage from './Tasks'

describe('<TasksPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TasksPage />)
  })
})