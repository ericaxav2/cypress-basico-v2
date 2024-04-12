/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach (function() {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function() {
    cy.get('#firstName').type ('Érica')
    cy.get('#lastName').type('Xavier')
    cy.get('#email').type('erica@gmail.com')
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lorem velit, porttitor a scelerisque vitae, scelerisque pellentesque leo. Nullam feugiat fermentum massa, at viverra eros congue nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc vel condimentum libero. Maecenas bibendum ornare ligula sit amet imperdiet. Aenean eget libero eros. Nunc mollis nisl id mauris commodo, commodo varius orci interdum. Duis rutrum orci fringilla, rhoncus enim id, molestie sem. In tristique elit mi. Aliquam mattis, nulla sed eleifend condimentum, augue diam imperdiet tortor, efficitur convallis felis leo sollicitudin nibh. Cras porta eget nisl quis feugiat. Cras efficitur dui eget tortor finibus tempor. Aenean scelerisque, augue nec euismod tincidunt, metus neque elementum quam, vel lobortis ante purus a ex. Sed eu ante convallis, iaculis dolor in, efficitur enim.', {delay:(0)})
    cy.get('button[type="submit"]').click()

    cy.get('.success') 
      .should('contain', 'Mensagem enviada com sucesso.')
      .and('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um e-mail com formato inválido', function() {
    cy.get('#firstName').type ('Érica')
    cy.get('#lastName').type('Xavier')
    cy.get('#email').type('ericacom')
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lorem velit, porttitor a scelerisque vitae, scelerisque pellentesque leo. Nullam feugiat fermentum massa, at viverra eros congue nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc vel condimentum libero. Maecenas bibendum ornare ligula sit amet imperdiet. Aenean eget libero eros. Nunc mollis nisl id mauris commodo, commodo varius orci interdum. Duis rutrum orci fringilla, rhoncus enim id, molestie sem. In tristique elit mi. Aliquam mattis, nulla sed eleifend condimentum, augue diam imperdiet tortor, efficitur convallis felis leo sollicitudin nibh. Cras porta eget nisl quis feugiat. Cras efficitur dui eget tortor finibus tempor. Aenean scelerisque, augue nec euismod tincidunt, metus neque elementum quam, vel lobortis ante purus a ex. Sed eu ante convallis, iaculis dolor in, efficitur enim.', {delay:(0)})
    cy.get('button[type="submit"]').click()

    cy.get('.error') 
      .should('contain',  'Valide os campos obrigatórios!')
      .and('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não-numérico',function() {
    cy.get('#phone')
      .type('abc')
      .should('have.value','')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function (){
    cy.get('#firstName').type ('Érica')
    cy.get('#lastName').type('Xavier')
    cy.get('#email').type('ericacom')
    cy.get('#phone-checkbox').click()
  
    cy.get('#open-text-area').type('outro texto pro telefone')
    cy.get('button[type="submit"]').click()

    cy.get('.error') 
      .should('contain',  'Valide os campos obrigatórios!')
      .and('be.visible')  
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName')
      .type ('Érica')
      .should ('have.value','Érica')
      .clear()
      .should ('have.value','')
    cy.get('#lastName')
      .type ('Xavier')
      .should ('have.value','Xavier')
      .clear()
      .should ('have.value','')    
    cy.get('#email')
      .type ('ericaxav@gmail.com')
      .should ('have.value','ericaxav@gmail.com')
      .clear()
      .should ('have.value','')
    cy.get('#phone')
      .type ('123456789')
      .should ('have.value','123456789')
      .clear()
      .should ('have.value','')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function (){
    cy.get('button[type="submit"]').click()
    cy.get('.error')
    .should('contain',  'Valide os campos obrigatórios!')
    .and('be.visible') 

  })
 
  it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success') 
    .should('contain', 'Mensagem enviada com sucesso.')
    .and('be.visible')
  })

//A partir daqui são os mesmos testes acima mas alterando cy.get por cy.contains no botão
  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function() {
    cy.get('#firstName').type ('Érica')
    cy.get('#lastName').type('Xavier')
    cy.get('#email').type('erica@gmail.com')
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lorem velit, porttitor a scelerisque vitae, scelerisque pellentesque leo. Nullam feugiat fermentum massa, at viverra eros congue nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc vel condimentum libero. Maecenas bibendum ornare ligula sit amet imperdiet. Aenean eget libero eros. Nunc mollis nisl id mauris commodo, commodo varius orci interdum. Duis rutrum orci fringilla, rhoncus enim id, molestie sem. In tristique elit mi. Aliquam mattis, nulla sed eleifend condimentum, augue diam imperdiet tortor, efficitur convallis felis leo sollicitudin nibh. Cras porta eget nisl quis feugiat. Cras efficitur dui eget tortor finibus tempor. Aenean scelerisque, augue nec euismod tincidunt, metus neque elementum quam, vel lobortis ante purus a ex. Sed eu ante convallis, iaculis dolor in, efficitur enim.', {delay:(0)})
    cy.contains('button', 'Enviar').click()

    cy.get('.success') 
      .should('contain', 'Mensagem enviada com sucesso.')
      .and('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um e-mail com formato inválido', function() {
    cy.get('#firstName').type ('Érica')
    cy.get('#lastName').type('Xavier')
    cy.get('#email').type('ericacom')
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lorem velit, porttitor a scelerisque vitae, scelerisque pellentesque leo. Nullam feugiat fermentum massa, at viverra eros congue nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc vel condimentum libero. Maecenas bibendum ornare ligula sit amet imperdiet. Aenean eget libero eros. Nunc mollis nisl id mauris commodo, commodo varius orci interdum. Duis rutrum orci fringilla, rhoncus enim id, molestie sem. In tristique elit mi. Aliquam mattis, nulla sed eleifend condimentum, augue diam imperdiet tortor, efficitur convallis felis leo sollicitudin nibh. Cras porta eget nisl quis feugiat. Cras efficitur dui eget tortor finibus tempor. Aenean scelerisque, augue nec euismod tincidunt, metus neque elementum quam, vel lobortis ante purus a ex. Sed eu ante convallis, iaculis dolor in, efficitur enim.', {delay:(0)})
    cy.contains('button', 'Enviar').click()

    cy.get('.error') 
      .should('contain',  'Valide os campos obrigatórios!')
      .and('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não-numérico',function() {
    cy.get('#phone')
      .type('abc')
      .should('have.value','')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function (){
    cy.get('#firstName').type ('Érica')
    cy.get('#lastName').type('Xavier')
    cy.get('#email').type('ericacom')
    cy.get('#phone-checkbox').click()
  
    cy.get('#open-text-area').type('outro texto pro telefone')
    cy.contains('button', 'Enviar').click()

    cy.get('.error') 
      .should('contain',  'Valide os campos obrigatórios!')
      .and('be.visible')  
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName')
      .type ('Érica')
      .should ('have.value','Érica')
      .clear()
      .should ('have.value','')
    cy.get('#lastName')
      .type ('Xavier')
      .should ('have.value','Xavier')
      .clear()
      .should ('have.value','')    
    cy.get('#email')
      .type ('ericaxav@gmail.com')
      .should ('have.value','ericaxav@gmail.com')
      .clear()
      .should ('have.value','')
    cy.get('#phone')
      .type ('123456789')
      .should ('have.value','123456789')
      .clear()
      .should ('have.value','')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function (){
    cy.contains('button', 'Enviar').click()
    cy.get('.error')
    .should('contain',  'Valide os campos obrigatórios!')
    .and('be.visible') 

  })
 
  it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success') 
    .should('contain', 'Mensagem enviada com sucesso.')
    .and('be.visible')
  })
it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
    .and('be.visible')
})

it('seleciona um produto (Mentoria) por seu valor (value)', function(){
  cy.get('#product')
  .select('mentoria')
  .should('have.value', 'mentoria')
  .and('be.visible')
})

it('seleciona um produto (Blog) por seu índice', function(){
  cy.get('#product')
  .select(1)
  .should('have.value', 'blog')
  .and('be.visible')
})

it('marca o tipo de atendimento "Feedback"', function(){
  cy.get('input[type="radio"][value="feedback"]')
  .check()
  .should('have.value','feedback')
})

it('marca cada tipo de atendimento', function(){
  cy.get('input[type="radio"]')
  .each(function($radio){
    cy.wrap($radio).check()
    cy.wrap($radio).should('be.checked')
  })
})

})