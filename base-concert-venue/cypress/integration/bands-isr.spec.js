/// <reference types="cypress" />

3;

it("renders 5 items on the server", () => {
  cy.request("/bands").its("body");
});

it("skips client-side bundle, confirming data from ISR cache", () => {
  // Reference: https://glebbahmutov.com/blog/ssr-e2e/#removing-application-bundle
  cy.request("/bands")
    .its("body")
    .then((html) => {
      // remove the application code bundle
      const staticHtml = html.replace('<script src="/bundle.js"></script>', "");
      cy.state("document").write(staticHtml);
      cy.findByRole("heading", { name: /the joyous nun riot/i }).should(
        "exist"
      );
      cy.findByRole("heading", { name: /Shamrock Pete/i }).should("exist");
      cy.findByRole("heading", { name: /the joyous nun riot/i }).should(
        "exist"
      );
    });
});
