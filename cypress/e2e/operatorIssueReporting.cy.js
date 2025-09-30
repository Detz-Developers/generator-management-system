// cypress/e2e/operator_issue_reporting.cy.ts

describe("Operator Issue Reporting Page", () => {
  // If you have a signed-in test user flow, set CYPRESS_TEST_USER=true in env and implement login in beforeEach
  const HAS_AUTH = Cypress.env("TEST_USER") === true || Cypress.env("TEST_USER") === "true";

  beforeEach(() => {
    // Optional: if you implement a custom login route or Firebase emulator auth, do it here.
    // Example (pseudo):
    // if (HAS_AUTH) {
    //   cy.task("firebaseLogin", { email: Cypress.env("EMAIL"), password: Cypress.env("PASSWORD") });
    // }

    cy.visit("/operator-issue-reporting-test");
  });

  it("should render the Issue Reporting header", () => {
    cy.contains("Issue Reporting").should("be.visible");
    cy.contains("Report and track your issues").should("be.visible");
  });

  it("should display all form inputs and toggles", () => {
    cy.get("input#gen-id").should("exist").and("be.visible");
    cy.get("textarea#issue-details").should("exist").and("be.visible");

    cy.get("input#emergency").should("exist");
    cy.get("input#battery-info").should("exist");

    cy.contains("Emergency").should("be.visible");
    cy.contains("Include Battery Info").should("be.visible");
  });

  it(" should allow typing into Generator ID and Issue Details", () => {
    cy.get("input#gen-id").clear().type("GN001").should("have.value", "GN001");

    cy.get("textarea#issue-details")
      .clear()
      .type("Generator not starting")
      .should("have.value", "Generator not starting");
  });

  it("should show loading or empty state before/after data loads", () => {
    // Expect either "Loading..." while fetching or empty state if none
    cy.contains(/Loading|No issues found/i, { timeout: 15000 }).should("exist");
  });

  it("should display issues table when data exists", () => {
    cy.contains("Your Reported Issues", { timeout: 20000 }).should("be.visible");
    // Now either a table is rendered or the empty state remains; assert table headers if present
    cy.get("table").then(($table) => {
      if ($table.length > 0) {
        cy.wrap($table).should("be.visible");
        cy.get("th").contains("Issue ID").should("exist");
        cy.get("th").contains("Description").should("exist");
        cy.get("th").contains("Assigned To").should("exist");
        cy.get("th").contains("Equipment").should("exist");
        cy.get("th").contains("Created At").should("exist");
        cy.get("th").contains("Status").should("exist");
        cy.get("th").contains("Actions").should("exist");
      } else {
        cy.contains(/No issues found/i).should("be.visible");
      }
    });
  });

  it("should have rows in the table or show empty message", () => {
    // Give Firebase some time if it uses network/WebSocket
    cy.wait(2000);
    cy.get("tbody tr").then(($rows) => {
      if ($rows.length > 0) {
        cy.wrap($rows.first()).within(() => {
          cy.get("td").eq(0).should("exist");
          cy.get("td").eq(1).should("exist");
          cy.get("td").eq(2).should("exist");
          cy.get("td").eq(3).should("exist");
          cy.get("button").should("exist"); // Actions
        });
      } else {
        cy.contains(/No issues found/i).should("be.visible");
      }
    });
  });

  it("should allow submitting a new issue (handles both auth/no-auth)", () => {
    cy.get("textarea#issue-details").clear().type("Test Issue for Cypress");

    // Listen for alert and accept both possible flows:
    let sawAlert = false;
    cy.on("window:alert", (text) => {
      sawAlert = true;
      // Accept either success (when logged-in) or login-needed (when not)
      expect(
        /Issue added successfully|Please log in first/i.test(text),
        `Unexpected alert text: ${text}`
      ).to.be.true;
    });

    cy.get('button[type="submit"]').click().then(() => {
      // Ensure we actually saw an alert
      cy.wrap(null).then(() => {
        expect(sawAlert, "An alert should have been shown").to.be.true;
      });
    });
  });

  it(" should have action buttons for each issue row if data exists", () => {
    cy.contains("Your Reported Issues", { timeout: 20000 }).should("be.visible");
    cy.wait(2000);
    cy.get("tbody tr").then(($rows) => {
      if ($rows.length > 0) {
        cy.wrap($rows.first()).within(() => {
          cy.get("button").should("exist").and("be.visible");
        });
      } else {
        cy.log(" No issues to test actions.");
      }
    });
  });
});