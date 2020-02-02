/// <reference types="cypress" />

describe("Weather information by city", () => {
  it("Navigates to website", () => {
    cy.visit("http://localhost:3000");
  });
  it("Fetches weather information for city name", () => {
    cy.get("[data-cy='cityName']").type("Gdynia");
    cy.get("[data-cy='submitCity']").click();

    cy.get("[data-cy='weatherDisplay']").contains("Gdynia");
  });
});

/// <reference types="cypress" />

describe("Weather information by lat and lon", () => {
  it("Fetches weather information by lat and lon", () => {
    cy.get("[data-cy='lat']").type("52.23");
    cy.get("[data-cy='lon']").type("21.01");

    cy.get("[data-cy='submitLatLon']").click();
    cy.get("[data-cy='weatherDisplay']").contains("Warsaw");
  });
});
