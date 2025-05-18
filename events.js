/**
 * SentiStock - Event Handlers Module
 * 
 * This module contains all event handlers for the application's UI elements.
 * It organizes event listeners by functional area.
 */

// Execute when document is ready
$(document).ready(function() {
    setupNavigationEvents();
    setupSectorEvents();
    setupCompanyEvents();
});

/**
 * Set up navigation events between different sections
 */
function setupNavigationEvents() {
    // Navigate from sectors to companies
    $('.sector').click(function() {
        navigateToSection('#sectors', '#companies');
    });

    // Navigate back from companies to sectors
    $('#c_back').click(function() {
        navigateToSection('#companies', '#sectors');
        window.changeBackground(''); // Reset to default gradient
    });

    // Navigate back from results to companies
    $('#r_back').click(function() {
        navigateToSection('#results', '#companies');
    });
}

/**
 * Helper function for handling section transitions
 * @param {string} fromSection - CSS selector for section to leave
 * @param {string} toSection - CSS selector for section to navigate to
 */
function navigateToSection(fromSection, toSection) {
    window.dim(fromSection);
    window.scrollToSection(toSection);
    window.brighten(toSection);
}

/**
 * Set up sector selection events
 */
function setupSectorEvents() {
    // Technology sector
    $('#sb1').click(function() {
        window.setCompanies('tech');
    });

    // Financial sector
    $('#sb3').click(function() {
        window.setCompanies('finance');
    });

    // Manufacturing/Automotive sector
    $('#sb4').click(function() {
        window.setCompanies('auto');
    });
}

/**
 * Set up company selection events
 */
function setupCompanyEvents() {
    // Handle company selection
    $('.company').click(function() {
        const companyId = $(this).attr('data-company-id');
        const companyData = $(this).data('company');
        
        // Skip if no valid company data
        if (!companyId || !companyData) {
            return;
        }
        
        // Update UI
        window.dim('#companies');
        window.brighten('#results');
        window.scrollToSection('#results');
        
        // Update results heading with selected company
        $('#results h1').text(companyData.name);
        
        // Change background color based on company
        window.changeBackground(companyId);
        
        // Display additional company information
        updateCompanyDetails(companyData);
    });
}

/**
 * Update the company details panel with information about the selected company
 * @param {Object} companyData - The company data object
 */
function updateCompanyDetails(companyData) {
    if (!companyData) return;
    
    // Create or update elements with company data
    const $details = $('#company-details');
    
    if ($details.length) {
        // If the details container exists, update its content
        $details.html(`
            <h2>${companyData.name}</h2>
            <div class="detail-item"><strong>Symbol:</strong> ${companyData.symbol || 'N/A'}</div>
            <div class="detail-item"><strong>Sector:</strong> ${getSectorName(companyData.sector) || 'N/A'}</div>
            <div class="detail-item description">${companyData.description || ''}</div>
        `);
    } else {
        // Create a new details container
        $('#results').append(`
            <div id="company-details">
                <h2>${companyData.name}</h2>
                <div class="detail-item"><strong>Symbol:</strong> ${companyData.symbol || 'N/A'}</div>
                <div class="detail-item"><strong>Sector:</strong> ${getSectorName(companyData.sector) || 'N/A'}</div>
                <div class="detail-item description">${companyData.description || ''}</div>
            </div>
        `);
    }
}

/**
 * Get the friendly name of a sector from its ID
 * @param {string} sectorId - The sector ID
 * @returns {string} The sector name
 */
function getSectorName(sectorId) {
    const sector = window.SentiStockData.sectors[sectorId];
    return sector ? sector.name : sectorId;
}