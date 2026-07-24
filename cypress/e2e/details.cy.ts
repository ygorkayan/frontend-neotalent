// as this project has the data Mocked, the car with id 1 is always the same!
// in a real project, we would have to mock the data or use a test database to ensure that the data is consistent for testing purposes.

describe("Details", () => {
  it("check if it is rendering", () => {
    cy.visit("http://localhost:5173/vehicle/1");
    cy.get("h1").contains("BMW 320d");
  });

  it("check if the back button is working", () => {
    cy.visit("http://localhost:5173/vehicle/1");
    cy.get(".back-button").click();
    cy.url().should("eq", "http://localhost:5173/");
  });

  it("check if some details are rendered", () => {
    cy.visit("http://localhost:5173/vehicle/1");
    cy.get(".value").contains("Saloon");
    cy.get(".value").contains("Diesel");
    cy.get(".value").contains("4");
    cy.get(".value").contains("120 g/km");

    cy.get(".value").contains("Black");
    cy.get(".value").contains("Automatic");
    cy.get(".value").contains("2");
    cy.get(".value").contains("0.03 g/km");
  });
});
