describe('Generator Details Page', () => {
  beforeEach(() => {
    // Navigate to admin page first
    cy.visit('/admin');
    
    // Navigate to Generators page
    cy.contains('Generators').click();
    
    // Wait for the generators page to load
    cy.contains('Generator List').should('be.visible');
    
    // Click on the view button for the first generator (G001)
    // The view button contains the MdOutlineRemoveRedEye icon
    cy.get('tbody tr').first().within(() => {
      // Look for the button with the eye icon (first button in the actions column)
      cy.get('button').first().click();
    });
  });

  describe('Page Header and Navigation', () => {
    it('displays correct page title and generator information', () => {
      cy.contains('Generator G001').should('be.visible');
      cy.contains('Caterpillar CAT-3516B - 50kW').should('be.visible');
    });

    it('navigates back to generators list when back button is clicked', () => {
      // The back button should navigate back to Generators page
      cy.get('button').contains('←').click(); // or however the back button is implemented
      // Verify we're back on the generators page
      cy.contains('Generator List').should('be.visible');
    });
  });

  describe('Generator Information Section', () => {
    it('displays all generator information fields', () => {
      cy.contains('Generator Information').should('be.visible');
      
      // Check all information fields are present
      cy.contains('Serial Number').should('be.visible');
      cy.contains('CAT123456789').should('be.visible');
      
      cy.contains('Status').should('be.visible');
      cy.contains('Active').should('be.visible');
      
      cy.contains('Location').should('be.visible');
      cy.contains('UP').should('be.visible');
      
      cy.contains('Issued Date').should('be.visible');
      cy.contains('11/12/2022').should('be.visible');
      
      cy.contains('Auto Start').should('be.visible');
      cy.contains('Not Enabled').should('be.visible');
      
      cy.contains('Operating Hours').should('be.visible');
      cy.contains('2450 hrs').should('be.visible');
      
      cy.contains('Warranty Expiry').should('be.visible');
      cy.contains('11/12/2026').should('be.visible');
      
      cy.contains('Installed Date').should('be.visible');
      cy.contains('11/12/2022').should('be.visible');
      
      cy.contains('Battery Charger').should('be.visible');
      cy.contains('Installed').should('be.visible');
    });

    it('displays status with correct styling', () => {
      cy.contains('Active').should('have.class', 'text-green-500');
      cy.contains('Active').should('have.class', 'bg-green-100');
    });
  });

  describe('Service Schedule Section', () => {
    it('displays service schedule information', () => {
      cy.contains('Service Schedule').should('be.visible');
      cy.contains('Last Service').should('be.visible');
      cy.contains('10/4/2025').should('be.visible');
      cy.contains('Due Service').should('be.visible');
      cy.contains('10/8/2025').should('be.visible');
    });

    it('opens service logging modal when Log Service button is clicked', () => {
      cy.contains('Log Service').click();
      cy.contains('Service Details').should('be.visible');
      cy.contains('Record service information and maintenance activities').should('be.visible');
    });
  });

  describe('Tab Navigation', () => {
    it('displays all three tabs', () => {
      cy.contains('Service History').should('be.visible');
      cy.contains('Repair Logs').should('be.visible');
      cy.contains('Extracted Parts').should('be.visible');
    });

    it('defaults to Service History tab', () => {
      // Check that Service History tab is active by default
      cy.contains('Service History').parent().should('have.class', 'bg-blue-500');
    });

    it('switches to Repair Logs tab when clicked', () => {
      cy.contains('Repair Logs').click();
      cy.contains('Repair Logs').parent().should('have.class', 'bg-blue-500');
      cy.contains('Service History').parent().should('not.have.class', 'bg-blue-500');
    });

    it('switches to Extracted Parts tab when clicked', () => {
      cy.contains('Extracted Parts').click();
      cy.contains('Extracted Parts').parent().should('have.class', 'bg-blue-500');
      cy.contains('Service History').parent().should('not.have.class', 'bg-blue-500');
    });
  });

  describe('Service History Tab', () => {
    beforeEach(() => {
      cy.contains('Service History').click();
    });

    it('displays service history table with correct headers', () => {
      cy.contains('Date').should('be.visible');
      cy.contains('Type').should('be.visible');
      cy.contains('Technician').should('be.visible');
      cy.contains('Description').should('be.visible');
      cy.contains('Cost').should('be.visible');
      cy.contains('Invoice No.').should('be.visible');
    });

    it('displays service history data', () => {
      cy.contains('10/4/2025').should('be.visible');
      cy.contains('Routine Maintenance').should('be.visible');
      cy.contains('Sahan Perera').should('be.visible');
      cy.contains('Oil change, filter replacement, general inspection').should('be.visible');
      cy.contains('LKR 10,000').should('be.visible');
      cy.contains('INV-2025-001').should('be.visible');
    });

    it('displays multiple service records', () => {
      // Check for multiple service records
      cy.get('tbody tr').should('have.length.at.least', 5);
      cy.contains('Preventive Service').should('be.visible');
      cy.contains('Emergency Repair').should('be.visible');
    });
  });

  describe('Repair Logs Tab', () => {
    beforeEach(() => {
      cy.contains('Repair Logs').click();
    });

    it('displays repair log entries', () => {
      cy.contains('Fuel pressure drop').should('be.visible');
      cy.contains('Resolved').should('be.visible');
      cy.contains('Investigated fuel system, found clogged filter').should('be.visible');
      cy.contains('Replaced fuel filter, tested system').should('be.visible');
    });

    it('displays technician information', () => {
      cy.contains('Technician:').should('be.visible');
      cy.contains('Dinal Rashmika').should('be.visible');
      cy.contains('Cost:').should('be.visible');
      cy.contains('LKR 900').should('be.visible');
      cy.contains('Date:').should('be.visible');
      cy.contains('7/20/2025').should('be.visible');
    });

    it('displays parts used information', () => {
      cy.contains('Parts Used:').should('be.visible');
      cy.contains('Fuel Filter - FFS320').should('be.visible');
      cy.contains('O-Ring Kit').should('be.visible');
    });

    it('displays warning icons for issues', () => {
      cy.contains('⚠️').should('be.visible');
    });
  });

  describe('Extracted Parts Tab', () => {
    beforeEach(() => {
      cy.contains('Extracted Parts').click();
    });

    it('displays extracted parts table with correct headers', () => {
      cy.contains('Part Name').should('be.visible');
      cy.contains('Part Number').should('be.visible');
      cy.contains('Extrct Date').should('be.visible');
      cy.contains('Condition').should('be.visible');
      cy.contains('Reason').should('be.visible');
      cy.contains('Detition').should('be.visible');
    });

    it('displays extracted parts data', () => {
      cy.contains('Oil Filter').should('be.visible');
      cy.contains('OF-1R076').should('be.visible');
      cy.contains('04/03/2025').should('be.visible');
      cy.contains('Routeline Replacement').should('be.visible');
      cy.contains('Recycled').should('be.visible');
    });

    it('displays condition badges with correct styling', () => {
      cy.contains('used').should('be.visible');
      cy.contains('Damaged').should('be.visible');
      cy.get('.bg-red-100').should('be.visible');
      cy.get('.bg-gray-300').should('be.visible');
    });
  });

  describe('Service Logging Modal', () => {
    beforeEach(() => {
      cy.contains('Log Service').click();
    });

    it('opens service logging modal', () => {
      cy.contains('Service Details').should('be.visible');
      cy.contains('Record service information and maintenance activities').should('be.visible');
    });

    it('displays all form fields', () => {
      cy.get('select[name="generatorId"]').should('be.visible');
      cy.get('select[name="serviceType"]').should('be.visible');
      cy.get('textarea[name="description"]').should('be.visible');
      cy.get('input[name="serviceDate"]').should('be.visible');
      cy.get('input[name="nextServiceDate"]').should('be.visible');
      cy.get('input[name="cost"]').should('be.visible');
      cy.get('textarea[name="notes"]').should('be.visible');
    });

    it('has correct form labels', () => {
      cy.contains('Generator ID').should('be.visible');
      cy.contains('Service Type').should('be.visible');
      cy.contains('Service Description').should('be.visible');
      cy.contains('Service Date').should('be.visible');
      cy.contains('Next Service Date').should('be.visible');
      cy.contains('Service Cost').should('be.visible');
      cy.contains('Technician Notes').should('be.visible');
    });

    it('displays dropdown options for generator selection', () => {
      cy.get('select[name="generatorId"]').click();
      cy.contains('Select generator').should('be.visible');
      cy.contains('Generator 1').should('be.visible');
      cy.contains('Generator 2').should('be.visible');
    });

    it('displays dropdown options for service type', () => {
      cy.get('select[name="serviceType"]').click();
      cy.contains('Select service type').should('be.visible');
      cy.contains('Repair').should('be.visible');
      cy.contains('Maintenance').should('be.visible');
    });

    it('allows form input', () => {
      cy.get('select[name="generatorId"]').select('gen1');
      cy.get('select[name="serviceType"]').select('maintenance');
      cy.get('textarea[name="description"]').type('Test service description');
      cy.get('input[name="serviceDate"]').type('2025-01-15');
      cy.get('input[name="nextServiceDate"]').type('2025-04-15');
      cy.get('input[name="cost"]').type('5000');
      cy.get('textarea[name="notes"]').type('Test technician notes');
    });

    it('closes modal when Cancel button is clicked', () => {
      cy.contains('Cancel').click();
      cy.contains('Service Details').should('not.exist');
    });

    it('submits form when Log Service button is clicked', () => {
      // Fill out the form
      cy.get('select[name="generatorId"]').select('gen1');
      cy.get('select[name="serviceType"]').select('maintenance');
      cy.get('textarea[name="description"]').type('Test service description');
      cy.get('input[name="serviceDate"]').type('2025-01-15');
      cy.get('input[name="nextServiceDate"]').type('2025-04-15');
      cy.get('input[name="cost"]').type('5000');
      cy.get('textarea[name="notes"]').type('Test technician notes');
      
      // Submit the form
      cy.contains('Log Service').click();
      
      // Verify modal closes after submission
      cy.contains('Service Details').should('not.exist');
    });
  });

  describe('Responsive Design', () => {
    it('adapts to mobile viewport', () => {
      cy.viewport('iphone-x');
      cy.contains('Generator G001').should('be.visible');
      cy.contains('Service History').should('be.visible');
    });

    it('adapts to tablet viewport', () => {
      cy.viewport('ipad-2');
      cy.contains('Generator G001').should('be.visible');
      cy.get('table').should('be.visible');
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      cy.get('h2').should('contain', 'Generator G001');
      cy.get('h3').should('contain', 'Generator Information');
      cy.get('h3').should('contain', 'Service Schedule');
    });

    it('has proper button labels', () => {
      cy.contains('Log Service').should('be.visible');
      cy.contains('Cancel').should('be.visible');
    });

    it('has proper form labels', () => {
      cy.get('label').should('contain', 'Generator ID');
      cy.get('label').should('contain', 'Service Type');
    });
  });
});