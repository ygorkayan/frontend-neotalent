describe("Home", () => {
  it("check if there is 6 cards", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".card").should("have.length", 6);
  });

  it("check if when I chose 12 vehicles per page, there are 12 cards", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".select-car-per-page").select("12");
    cy.get(".card").should("have.length", 12);
  });

  it("check if when I chose BMW make, there are only BMW cards", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".select-make").first().select("BMW");
    cy.get(".card").should("have.length", 1);
  });

  it("check if when I click on Clear filters, all cards came back", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".select-make").first().select("BMW");
    cy.get(".card").should("have.length", 1);

    cy.get(".button").click();
    cy.get(".card").should("have.length", 6);
  });

  it("check if when I favorite a car, it is marked as favorite", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".card").first().find(".favorite-button").click();
    cy.get(".card").first().find(".favorite-button").should("have.attr", "aria-pressed", "true");
  });

  it("check if when I click on a card, it navigates to the vehicle page", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".card").first().click();
    cy.url().should("include", "/vehicle/");
  });
});
