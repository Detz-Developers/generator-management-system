describe("Operator Issue Reporting Page", () => {
  const openIssueReporting = () => {
    cy.visit("/operator");

    // Click the sidebar tab explicitly inside the nav to avoid matching the H1/header
    cy.get("nav", { timeout: 10000 })
      .contains("button", "Issue Reporting", { timeout: 10000 })
      .should("exist")
      .click();

    // Wait for the content area to show the Issue Reporting header
    cy.get("main", { timeout: 10000 })
      .find("h1")
      .contains("Issue Reporting", { timeout: 10000 })
      .should("be.visible");
  };

  beforeEach(() => {
    openIssueReporting();
  });

  it("renders the page header", () => {
    cy.get("main").within(() => {
      cy.contains("h1", "Issue Reporting").should("be.visible");
      cy.contains("Report Your Breakdown").should("be.visible");
    });
  });

  it("allows typing in Gen ID input", () => {
    cy.get("main").within(() => {
      cy.get("input#genl-id")
        .should("exist")
        .clear()
        .type("G12345")
        .should("have.value", "G12345");
    });
  });

  it("toggles Emergency switch", () => {
    cy.get("main").within(() => {
      cy.get("input#emergency").should("exist").and("be.checked");
      cy.get("input#emergency").click().should("not.be.checked");
    });
  });

  it("enters issue details", () => {
    cy.get("main").within(() => {
      cy.get("textarea#issue-details")
        .should("exist")
        .type("Generator stopped unexpectedly")
        .should("have.value", "Generator stopped unexpectedly");
    });
  });

  it("renders the issue table and actions", () => {
    cy.get("main").within(() => {
      cy.get("table").should("exist");
      cy.contains("Recent Issue Assignment Table").should("be.visible");
      cy.get("tbody tr").should("have.length", 4);
      cy.get("tbody tr").first().within(() => {
        cy.contains("Reopen").should("exist");
      });
    });
  });

  it("navigates on view details button click", () => {
    cy.get("main").within(() => {
      cy.get("tbody tr").first().within(() => {
        cy.get("button").first().click();
      });
    });
  });
});