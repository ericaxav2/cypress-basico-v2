Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type ('Érica')
    cy.get('#lastName').type('Xavier')
    cy.get('#email').type('erica@gmail.com')
    cy.get('#open-text-area').type('Texto')
    cy.get('button[type="submit"]').click()
})