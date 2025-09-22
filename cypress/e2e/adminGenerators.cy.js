

describe("Admin - Generators page", () => {
  const openAdminGenerators = () => {
    cy.visit("/admin");

    // Click sidebar button
    cy.get("nav", { timeout: 10000 })
      .contains("button", "Generators", { timeout: 10000 })
      .should("exist")
      .click();

    // Wait for the page header to appear
    cy.contains("h1", "Generators", { timeout: 10000 }).should("be.visible");
  };

  const getContentMain = () => {
    // Scope to the main that contains the Generators header
    return cy.contains("h1", "Generators").parents("main").first();
  };

  beforeEach(() => {
    openAdminGenerators();
  });

  it("shows header and metrics cards", () => {
    getContentMain().within(() => {
      cy.contains("h1", "Generators").should("be.visible");
      cy.contains("Manage all your generators across your centers").should("be.visible");
      cy.contains("Total Generators").should("be.visible");
      cy.contains("Active").should("be.visible");
      cy.contains("Under Repair").should("be.visible");
      cy.contains("Unusable").should("be.visible");
    });
  });

  it("has Filters section and controls", () => {
    getContentMain().within(() => {
      cy.contains("Filters").should("be.visible");
      cy.get('input[placeholder="Search generators..."]').should("exist");
      cy.get("select").should("have.length.at.least", 4);
    });
  });

  it("filters the table with search", () => {
    getContentMain().within(() => {
      cy.get('input[placeholder="Search generators..."]').clear().type("G001");
      cy.contains("Generators Found"); // count text exists
      cy.get("table tbody tr").should("have.length.at.least", 1);
      cy.get("table tbody tr").first().within(() => {
        cy.contains("G001").should("exist");
      });
    });
  });

  it("shows the generator list table and actions", () => {
    getContentMain().within(() => {
      cy.get("table").should("exist");
      cy.contains("Generator List").should("be.visible");
      cy.get("table thead th").should("have.length", 9);
      cy.get("table tbody tr").should("have.length.at.least", 1);
    });
  });

  it("clicks the view and edit action buttons", () => {
    getContentMain().within(() => {
      cy.get("table tbody tr").first().within(() => {
        cy.get("button").eq(0).click(); // view
        cy.get("button").eq(1).click(); // edit
      });
    });
  });

it("opens Add Generator modal when clicking Add Generator button", () => {
  getContentMain().within(() => {
    // Click the Add Generator button in header
    cy.contains("button", "Add Generator").click();
  });

  // Modal should appear
 cy.get('[data-cy="add-generator-modal"]').within(() => {
  cy.contains("h2", "Add Generator").should("be.visible");
  cy.contains("Size").should("be.visible");
  cy.contains("Serial Number").should("be.visible");
  cy.contains("Installed Date").should("be.visible");
  cy.contains("button", "Cancel").click();
});


  // Verify modal is closed
  cy.contains("h2", "Add Generator").should("not.exist");
});


});
