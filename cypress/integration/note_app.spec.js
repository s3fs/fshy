/* eslint-disable no-undef */
describe('Note app tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('open frommnt page', () => {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2021')
  })

  it('open login form', () => {
    cy.contains('Log in').click()
  })

  it('log in', () => {
    cy.contains('Log in').click()
    cy.get('#username').type('hakim')
    cy.get('#password').type('salainen')
    cy.get('#login_button').click()
    cy.contains('hakim logged-in')
  })
  
  describe('logged in', () => {
    beforeEach(() => {
      cy.contains('Log in').click()
      cy.get('#username').type('hakim')
      cy.get('#password').type('salainen')
      cy.get('#login_button').click()
    })

    it('creating new note', () => {
      cy.contains(/new note/i).click()
      cy.get('input').type('a note created by cypress')
      cy.contains(/save/i).click()
      cy.contains('a note created by cypress')
    })
  })
})