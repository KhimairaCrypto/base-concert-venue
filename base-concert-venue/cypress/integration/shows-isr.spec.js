/// <reference types="cypress" />

it("skips client-side bundle, confirming data from ISR cache", () => {
  // Reference: https://glebbahmutov.com/blog/ssr-e2e/#removing-application-bundle
  cy.request("/shows")
    .its("body")
    .then((html) => {
      // remove the application code bundle
      const staticHtml = html.replace('<script src="/bundle.js"></script>', "");
      cy.state("document").write(staticHtml);
      cy.findAllByText(/2002 apr 1[567]/i).should("have.length.of", 3);
    });
});
