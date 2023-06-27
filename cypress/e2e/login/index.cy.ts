/* eslint-disable cypress/no-unnecessary-waiting */
describe("Login Page", () => {
  it("Deberia mostrar el login page", () => {
    cy.visit("/auth/login");
    cy.get("h1").contains("Inicia sesión en tu cuenta");
  });

  it("Deberia de mostrar mensajes de error", () => {
    cy.visit("/auth/login");
    cy.get("h1").contains("Inicia sesión en tu cuenta");
    // Campos vacios
    cy.get("#email-error").contains("El campo no debe estar vacío");
    cy.get("#password-error").contains("El campo no debe estar vacío");
    // Valores no validos
    cy.get("input[name=email]").focus();
    cy.get("input[name=email]").type("test");
    cy.get("input[name=password]").focus();
    cy.get("input[name=password]").type("test");
    cy.get("#email-error").contains("El correo no parece ser válido");
    cy.get("#password-error").contains("La contraseña debe tener al menos 8 caracteres");
    // Contraseña no cumple los requisitos (min 8 caracteres, mayuscula, minuscula, numero y un caracter especial)
    cy.get("input[name=password]").focus();
    cy.get("input[name=password]").type("123456789");
    cy.get("#password-error").contains("La contraseña no cumple con los requisitos");
  });

  it("Deberia poder hacer login en la cuenta Default", () => {
    cy.visit("/auth/login");
    cy.get("h1").contains("Inicia sesión en tu cuenta");
    cy.get("input[name=email]").focus();
    cy.get("input[name=email]").type("pedro.perez@gmail.com");
    cy.get("input[name=password]").focus();
    cy.get("input[name=password]").type("123456789Test!@");
    cy.get("button[type=submit]").contains("Iniciar Sesión").click();
    cy.wait(2000);
    cy.url().should("include", "/");
  });

  it("Deberia poder hacer login en la cuenta Default y desloguear", () => {
    cy.visit("/auth/login");
    cy.get("h1").contains("Inicia sesión en tu cuenta");
    cy.get("input[name=email]").focus();
    cy.get("input[name=email]").type("pedro.perez@gmail.com");
    cy.get("input[name=password]").focus();
    cy.get("input[name=password]").type("123456789Test!@");
    cy.get("button[type=submit]").contains("Iniciar Sesión").click();
    cy.wait(5000);
    cy.url().should("include", "/");
    cy.get("#menu").click();
    cy.get("a").contains("Cerrar sesión").click();
    cy.url().should("include", "/auth/login");
  })
})
