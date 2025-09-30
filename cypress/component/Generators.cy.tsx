// cypress/component/Generators.cy.tsx
import React from "react";
import { mount } from "cypress/react";
import Generators from "../../frontend/src/components/admin/Generators";

describe("Generators Component", () => {
  it("renders the Generators component", () => {
    mount(<Generators onNavigate={() => {}} />);
    cy.contains("Generators").should("be.visible");
    cy.contains("Add Generator").should("be.visible");
  });

  it("opens the Add Generator modal", () => {
    mount(<Generators onNavigate={() => {}} />);
    cy.contains("Add Generator").click();
    cy.get("[data-cy=add-generator-modal]").should("be.visible");
  });
});
