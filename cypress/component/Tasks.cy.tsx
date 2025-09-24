import { mount } from "cypress/react";
import TasksPage from "../../frontend/src/components/admin/Tasks";

describe("TasksPage Component", () => {
  beforeEach(() => {
    mount(<TasksPage />);
  });

  it("renders the header correctly", () => {
    cy.contains("h1", "Tasks").should("exist");
    cy.contains("p", "Manage task assignments and track progress").should("exist");
  });

  it("renders all metrics cards", () => {
    cy.contains("Pending Tasks").should("exist");
    cy.contains("Completed").should("exist");
    cy.contains("Overdue").should("exist");
    cy.contains("Due Today").should("exist");
  });

  it("filters tasks using search input", () => {
    cy.get('input[placeholder="Search tasks..."]').type("Battery");
    cy.get("tbody tr").should("have.length", 1);
    cy.get("tbody tr td:nth-child(2)").should("contain.text", "Battery replacement");
  });

  it("toggles task status", () => {
    cy.contains("button", "Complete").first().click();
    cy.get("tbody tr").first().find("td span").should("contain.text", "Completed");

    cy.contains("button", "Reopen").first().click();
    cy.get("tbody tr").first().find("td span").should("contain.text", "Pending");
  });

  it("opens and closes the view modal", () => {
    cy.contains("button", "View").first().click();
    cy.contains("h2", "Task Details").should("exist");

    // ✅ Close modal safely (icon button instead of "×")
    cy.get("button.absolute.top-4.right-4").click({ force: true });

    cy.contains("h2", "Task Details").should("not.exist");
  });

  it("opens the assign task modal and assigns a task", () => {
    cy.contains("button", /Assign Task/).click();

    // ✅ Wait for modal to render
    cy.contains("h2", "Assign Task").should("exist");

    // ✅ Wait until generator dropdown has options
    cy.get("select").eq(0).should("be.visible").find("option").should("have.length.greaterThan", 1);
    cy.get("select").eq(0).select("G001", { force: true });

    // ✅ select assignee
    cy.get("select").eq(1).select("Sahan P.");

    // ✅ fill out other fields
    cy.get("textarea").type("Test task via Cypress");
    cy.get("input[type='date']").type("2025-08-20");
    cy.get("select").eq(2).select("Pending");

    // ✅ submit form
    cy.get("form").submit();

    // Modal should close
    cy.contains("h2", "Assign Task").should("not.exist");

    // Task should appear in table
    cy.get("tbody tr").first().should("contain.text", "Test task via Cypress");
  });
});
