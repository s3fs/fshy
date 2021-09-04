/* eslint-disable no-undef */
describe('Note app tests', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'hakim',
      username: 'hakim',
      password: 'salainen'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
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
      cy.contains(/save note/i).click()
      cy.contains(/show all notes/i).click()
      cy.contains('a note created by cypress')
    })

    describe('a note exists', () => {
      beforeEach(() => {
        cy.contains(/new note/i).click()
          .get('input').type('anotha note')

        cy.contains(/save note/i).click()
        cy.contains(/show all notes/i).click()
      })

      it('note imp toggle', () => {
        cy.contains('anotha note')
          .contains('make important').click()

        cy.contains('anotha note')
          .contains('make not important')
      })
    })
  })
})