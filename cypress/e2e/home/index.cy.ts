/* eslint-disable cypress/no-unnecessary-waiting */
describe("Home Page", () => {
  it("Home page should load", () => {
    cy.setCookie("next-auth.session-token", Cypress.env("testCookie"));
    cy.visit("/");
    cy.contains("h1", "Pokédex");
  })

  it("Should be able to see the pokemon list", () => {
    cy.setCookie("next-auth.session-token", Cypress.env("testCookie"));
    cy.visit("/");
    cy.wait(10000)
    cy.get('#pokemon-list').children().should("have.length", 10);
  })

  it("Should be able to see the pagination", () => {
    cy.setCookie("next-auth.session-token", Cypress.env("testCookie"));
    cy.visit("/");
    cy.wait(10000)
    cy.get('#pagination').should("exist");
  })

  it("Should be able to see the pokemon list after click on the next page", () => {
    cy.setCookie("next-auth.session-token", Cypress.env("testCookie"));
    cy.visit("/");
    cy.wait(10000)
    cy.get('#pagination').should("exist");
    cy.get('#next-page').click();
  })

  it("Should be able to see the pokemon list after click on the previous page", () => {
    cy.setCookie("next-auth.session-token", Cypress.env("testCookie"));
    cy.visit("/");
    cy.wait(10000)
    cy.get('#pagination').should("exist");
    cy.get('#next-page').click();
    cy.wait(10000)
    cy.get('#previous-page').click();
  })
})