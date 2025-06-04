import userData from '../fixtures/userData.json'

describe('Orange HRM Tests', () => {

const SelectorsList = {

  usernameField: "[name='username']",
  passowordField: "[name='password']",
  loginButton:"[type='submit']",
  sectionTitleTopBar: ".oxd-topbar-header-breadcrumb > .oxd-text",
  wrongCredentialAlert: '.oxd-alert',
  wrongCredentialAlertUserRequired: ".oxd-input-field-error-message",
  myInfoButton: "[href='/web/index.php/pim/viewMyDetails']",
  firtsNameField: "[name='firstName']",
  lastNameField: "[name='lastName']",
  nickNameField: ".oxd-input--active"
}

  it.only('Login com sucesso', () => {

    cy.visit('/auth/login')
    cy.get(SelectorsList.usernameField).type(userData.userSucess.username)
    cy.get(SelectorsList.passowordField).type(userData.userSucess.password)
    cy.get(SelectorsList.loginButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(SelectorsList.sectionTitleTopBar).contains('Dashboard')
    cy.get(SelectorsList.myInfoButton).click()
    cy.location('pathname').should('include', '/web/index.php/pim/viewPersonalDetails')
    cy.get(SelectorsList.firtsNameField).type('Teste')
    cy.get(SelectorsList.lastNameField).type('Tesste')
    cy.get(SelectorsList.nickNameField).eq(3).type('Test')



  })

    it('Login falho', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get(SelectorsList.usernameField).type(userData.userFail.username)
    cy.get(SelectorsList.passowordField).type(userData.userSucess.password)
    cy.get(SelectorsList.loginButton).click()
    cy.get(SelectorsList.wrongCredentialAlert)
    
  })

   it('Login com campo admin em branco', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get(SelectorsList.usernameField).should('have.value', '')
    cy.get(SelectorsList.passowordField).type("admin1234")
    cy.get(SelectorsList.loginButton).click()
    cy.get(SelectorsList.wrongCredentialAlertUserRequired)
  })

   it('Login com campo senha em branco', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get(SelectorsList.usernameField).type("admin1234")
    cy.get(SelectorsList.passowordField).should('have.value', '')
    cy.get(SelectorsList.loginButton).click() 
    cy.get('.oxd-button').click()
    
  })












})