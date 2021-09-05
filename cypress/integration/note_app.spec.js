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

  it('wrong cred login fail', () => {
    cy.contains(/log in/i).click()
    cy.get('#username').type('hakim')
    cy.get('#password').type('hahapasswooord')
    cy.get('#login_button').click()
    cy.get('.error').contains(/wrong credentials/i) //should('contain', 'wrong credentials')

    cy.get('.error')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'hakim logged in')
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
  
  describe.only('logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'hakim', password: 'salainen' })
    })

    it('creating new note', () => {
      cy.contains(/new note/i).click()
      cy.get('input').type('a note created by cypress')
      cy.contains(/save note/i).click()
      cy.contains('a note created by cypress')
    })

    describe('a note exists', () => {
      beforeEach(() => {
        cy.newNote({ content: '1st note', important: false })
        cy.newNote({ content: '2nd note', important: false })
        cy.newNote({ content: '3rd note', important: false })
      })

      it('note imp toggle', () => {
        //chaining looks for content within chained element
        //using find bc get would search the whole page
        cy.contains('2nd note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })
})