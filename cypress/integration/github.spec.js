/// <reference types="cypress" />

describe('github app', () => {

  beforeEach(() => {
    cy.visit('//localhost:4200')
  })

  it('search input should be invalid', () => {

    cy.get('button#git-search')
      .click();

    cy.get('input[type="search"]')
      .should('have.class', 'ng-invalid required');
  })

  it('search input should be valid', () => {

    cy.get('input[type="search"]')
      .type('thomson92')
      .click()
      .and('have.class', 'ng-dirty ng-valid');
  })

  it('should display provided user repositories', () => {

    cy.get('input[type="search"]')
      .type('thomson92');

    cy.intercept({
      method: 'GET',
      url: '/users/thomson92/repos'
    }, req => {
      req.reply(res => {
        res.send({
          fixture: 'repos.json'
        });
      });
    }).as('getRepositories')

    cy.get('button#git-search')
      .click();
  })

});
