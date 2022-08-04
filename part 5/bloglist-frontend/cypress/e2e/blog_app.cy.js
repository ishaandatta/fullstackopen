
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })


  it('Login form is showed', function() {
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login').click()
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('abc123')
      cy.contains('login').click()
      cy.contains('Wrong credentials')
    })
  })


  describe('When logged in',function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A Blog can be created via UI', function() {
      cy.contains('create').click()
      cy.get('#title').type('Ishaan Cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('abc.cypress.com')
      cy.get('#create').click()
      cy.contains('Ishaan Cypress')
    //   cy.pause()
    })

    it('Blogs can be liked via UI', function() {
      cy.contains('create').click()
      cy.get('#title').type('Ishaan Cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('abc.cypress.com')
      cy.get('#create').click()

      cy.get('.blog').contains('Ishaan Cypress').contains('view').click()
      cy.get('.blog').contains('Ishaan Cypress').contains('like').click()
    //   cy.pause()
    })

    it('User who created a blog can delete it via UI', function() {
      cy.createBlog({ title:'Autocreated Blog', author:'Cypress', url:'abc.cypress.com' })
      cy.get('.blog').contains('Autocreated Blog').contains('remove').click()
    })

    it('Blogs are ordered by likes', function() {
      cy.createBlog({ title:'Blog 1', author:'Cypress', url:'abc.cypress.com', likes:0 })
      cy.createBlog({ title:'Blog 2', author:'Cypress', url:'abc.cypress.com', likes:3 })
      cy.createBlog({ title:'Blog 3', author:'Cypress', url:'abc.cypress.com', likes:2 })

      cy.get('.blog').contains('Blog 1').contains('view').click()
      cy.get('.blog').contains('Blog 1').contains('like').as('likeButton')

      cy.get('@likeButton').click()
      cy.wait(1000)
      cy.get('@likeButton').click()
      cy.wait(1000)
      cy.get('@likeButton').click()
    //   cy.get('.blog').eq(0).contains('Blog 1')
    //   cy.get('.blog').eq(1).contains('Blog 2')
    })

  })


})
