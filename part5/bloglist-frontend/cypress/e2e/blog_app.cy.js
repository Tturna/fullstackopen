const baseUrl = 'http://localhost:3003'

describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', `${baseUrl}/api/testing/reset`)
        cy.request('POST', `${baseUrl}/api/users`, {
            username: 'testdude', password: 'password'
        })
        cy.visit('http://localhost:5173')
    })

    it('Login form is shown', function() {
        cy.contains('Log in to application')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#usernameInput').type('testdude')
            cy.get('#passwordInput').type('password')
            cy.contains('login').click()
            cy.contains('Logged in as testdude')
        })

        it('fails with wrong credentials', function() {
            cy.get('#usernameInput').type('wrong username')
            cy.get('#passwordInput').type('wrong password')
            cy.contains('login').click()
            cy.contains('Wrong username or password')
        })
    })
})
