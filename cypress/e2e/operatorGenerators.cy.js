// cypress/e2e/operator_generators.cy.ts

describe("Operator Generators Page", () => {
  // Change this if your test route differs
  const PAGE_URL = "/operator-generators-test";

  beforeEach(() => {
    cy.visit(PAGE_URL);
  });

  it("should render the header and shop status line", () => {
    cy.contains("Available Generators").should("be.visible");

    // Depending on DB, any of these may appear
    cy.contains(/Owned by|Loading shop|No shop found/i, { timeout: 20000 }).should("exist");
  });

  it("should display search and battery filter toggles", () => {
    cy.get('input[placeholder="Serial Number"]').should("exist").and("be.visible");

    // Toggle container
    cy.get('[role="tablist"][aria-label="Generator filter"]').should("exist").and("be.visible");

    // Two buttons: With Battery / Without Battery
    cy.contains("button", "With Battery").should("exist").and("be.visible");
    cy.contains("button", "Without Battery").should("exist").and("be.visible");
  });

  it(" search input should accept typing", () => {
    cy.get('input[placeholder="Serial Number"]')
      .clear()
      .type("G00")
      .should("have.value", "G00");
  });

  it("battery filter toggles update aria-selected state", () => {
    cy.contains("button", "With Battery")
      .should("have.attr", "aria-selected", "true");

    cy.contains("button", "Without Battery").click();
    cy.contains("button", "Without Battery")
      .should("have.attr", "aria-selected", "true");
    cy.contains("button", "With Battery")
      .should("have.attr", "aria-selected", "false");

    cy.contains("button", "With Battery").click();
    cy.contains("button", "With Battery")
      .should("have.attr", "aria-selected", "true");
  });

  it("shows loading, empty, or list of generators", () => {
    // While fetching
    cy.contains(/Loading generators/i).should("exist");

    // After fetch settles, either empty or list appears
    cy.contains(/No generators found/i, { timeout: 20000 }).then(($empty) => {
      if ($empty.length > 0) {
        // Empty state verified
        cy.wrap($empty).should("be.visible");
      } else {
        // Expect some generator cards
        cy.get(".space-y-4 .rounded-lg.shadow", { timeout: 20000 }).should("exist");
      }
    });
  });

  it("date picker opens, shows calendar, and closes on OK", () => {
    // Open popover
    cy.contains("Date").should("be.visible");
    cy.get('button[aria-haspopup="dialog"]').click();

    // Popover container
    cy.get(".origin-top.left-0.bg-white.rounded-xl.shadow-xl.border", { timeout: 10000 })
      .should("exist")
      .and("be.visible");

    // Calendar OK button
    cy.contains("button", "OK").should("exist").click();

    // Popover should close
    cy.get(".origin-top.left-0.bg-white.rounded-xl.shadow-xl.border").should("not.exist");
  });

  it("timeframe pills switch active state", () => {
    // 7D is one of the pills
    cy.contains("button", "7D").should("exist").click();
    cy.contains("button", "7D").should("have.class", "bg-white");

    cy.contains("button", "30D").click();
    cy.contains("button", "30D").should("have.class", "bg-white");

    cy.contains("button", "90D").click();
    cy.contains("button", "90D").should("have.class", "bg-white");
  });

  it(" chart is rendered", () => {
    // The chart uses an SVG with area/line, ensure it exists
    cy.get("svg").should("exist").and("be.visible");
  });
});