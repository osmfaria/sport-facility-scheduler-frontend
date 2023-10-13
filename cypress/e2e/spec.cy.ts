describe('register an user', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register')
  })

  it('should enter register page and input data', () => {
    cy.get("input[name='email']")
      .type('odin@email.com')
      .should('have.value', 'odin@email.com')

    cy.get("input[name='username']")
      .type('odin1998')
      .should('have.value', 'odin1998')

    cy.contains('button', 'User')
      .as('userToggleButton')
      .should('have.attr', 'aria-pressed', 'true')

    cy.contains('button', 'Facility Owner')
      .as('ownerToggleButton')
      .click()
      .should('have.attr', 'aria-pressed', 'true')

    cy.get("input[name='first_name']").type('odin').should('have.value', 'odin')

    cy.get("input[name='last_name']")
      .type('allfather')
      .should('have.value', 'allfather')

    cy.get("input[name='password']")
      .type('P@ssw0rd')
      .should('have.value', 'P@ssw0rd')

    cy.get("input[name='confirmPassword']")
      .type('P@ssw0rd')
      .should('have.value', 'P@ssw0rd')
  })
})

export {}
