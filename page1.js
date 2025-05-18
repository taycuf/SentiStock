/**
 * SentiStock - Core Functionality Module
 */

// Create a central data store for the application
window.SentiStockData = {
    /**
     * Company data structure
     * @type {Object}
     */
    companies: {
        // Company ID keys with properties
        'msft': {
            name: 'Microsoft',
            background: 'linear-gradient(135deg, #7FBA00 0%, #00A4EF 50%, #FFB900 75%, #F25022 100%)',
            sector: 'tech',
            symbol: 'MSFT',
            description: 'Technology company focused on software and services.'
        },
        'aapl': {
            name: 'Apple',
            background: 'linear-gradient(135deg, #A3A3A3 0%, #ED1C24 100%)',
            sector: 'tech',
            symbol: 'AAPL',
            description: 'Consumer electronics and software company.'
        },
        'goog': {
            name: 'Alphabet',
            background: 'linear-gradient(135deg, #4285F4 0%, #34A853 33%, #FBBC05 66%, #EA4335 100%)',
            sector: 'tech',
            symbol: 'GOOG',
            description: 'Parent company of Google.'
        },
        'crm': {
            name: 'Salesforce',
            background: 'linear-gradient(135deg, #00A1E0 0%, #1798c1 100%)',
            sector: 'tech',
            symbol: 'CRM',
            description: 'Cloud-based software company.'
        },
        'tsla': {
            name: 'Tesla',
            background: 'linear-gradient(135deg, #cc0000 0%, #000000 100%)',
            sector: 'auto',
            symbol: 'TSLA',
            description: 'Electric vehicle and clean energy company.'
        },
        'ms': {
            name: 'Morgan Stanley',
            background: 'linear-gradient(135deg, #0033a0 0%, #00b2a9 100%)',
            sector: 'finance',
            symbol: 'MS',
            description: 'Multinational investment bank and financial services company.'
        },
        'gs': {
            name: 'Goldman Sachs',
            background: 'linear-gradient(135deg, #0033a0 0%, #7399c6 100%)',
            sector: 'finance',
            symbol: 'GS',
            description: 'Multinational investment bank and financial services company.'
        },
        'jpm': {
            name: 'JPM',
            background: 'linear-gradient(135deg, #2e3137 0%, #0f121a 100%)',
            sector: 'finance',
            symbol: 'JPM',
            description: 'Global financial services firm.'
        },
        'ma': {
            name: 'Mastercard',
            background: 'linear-gradient(135deg, #EB001B 0%, #F79E1B 100%)',
            sector: 'finance',
            symbol: 'MA',
            description: 'Technology company in the global payments industry.'
        },
        'gm': {
            name: 'General Motors',
            background: 'linear-gradient(135deg, #0170CE 0%, #101010 100%)',
            sector: 'auto',
            symbol: 'GM',
            description: 'Multinational automotive manufacturing company.'
        },
        'ba': {
            name: 'Boeing',
            background: 'linear-gradient(135deg, #0039a6 0%, #c4d8e2 100%)',
            sector: 'auto',
            symbol: 'BA',
            description: 'American multinational aerospace and defense corporation.'
        },
        'f': {
            name: 'Ford',
            background: 'linear-gradient(135deg, #00274e 0%, #91c6F7 100%)',
            sector: 'auto',
            symbol: 'F',
            description: 'American automobile company.'
        }
    },
    
    /**
     * Sector definitions
     * @type {Object}
     */
    sectors: {
        'tech': {
            name: 'Technology',
            description: 'Technology sector companies',
            companies: ['msft', 'crm', 'aapl', 'goog']
        },
        'finance': {
            name: 'Financial Services',
            description: 'Banks and financial services companies',
            companies: ['ms', 'gs', 'jpm', 'ma']
        },
        'auto': {
            name: 'Automotive',
            description: 'Automotive and manufacturing companies',
            companies: ['gm', 'ba', 'f', 'tsla']
        }
    },
    
    /**
     * Default app background
     * @type {string}
     */
    defaultBackground: 'linear-gradient(to right, #3a2f6b, #36669c, #41a0ae, #3ec995, #77f07f)'
};

// Define utility functions in the global scope
// These need to be available across all script files

/**
 * Navigate to a specific section with smooth scrolling
 * @param {string} section - CSS selector for the target section
 */
window.scrollToSection = function(section) {
    $(section)[0].scrollIntoView({ behavior: 'smooth' });
};

/**
 * Reduce opacity of a section to visually dim it
 * @param {string} section - CSS selector for the section to dim
 */
window.dim = function(section) {
    $(section).css({ transition: 'opacity 0.5s ease', opacity: '0.3' });
};

/**
 * Restore full opacity to a section
 * @param {string} section - CSS selector for the section to brighten
 */
window.brighten = function(section) {
    $(section).css({ transition: 'opacity 0.5s ease', opacity: '1' });
};

/**
 * Update company buttons with provided company IDs
 * @param {string} sectorId - The sector ID to display
 */
window.setCompanies = function(sectorId) {
    // Get the sector data
    const sector = window.SentiStockData.sectors[sectorId];
    
    if (!sector || !sector.companies) {
        console.error(`Sector '${sectorId}' not found or has no companies`);
        return;
    }
    
    // Get all company buttons
    const companyButtons = $('#companies .btn-square');
    
    // Update each button with a company name or 'N/A'
    companyButtons.each(function(index) {
        const companyId = index < sector.companies.length ? sector.companies[index] : null;
        let companyName = 'N/A';
        let companyData = null;
        
        // If we have a valid company ID, get the company data
        if (companyId && window.SentiStockData.companies[companyId]) {
            companyData = window.SentiStockData.companies[companyId];
            companyName = companyData.name;
        }
        
        // Update button text
        $(this).text(companyName);
        
        // Store the company data in the button's data attribute for later use
        if (companyData) {
            $(this).data('company', companyData);
            $(this).removeClass('empty');
            $(this).attr('data-company-id', companyId); // Add ID as attribute for easier access
        } else {
            $(this).addClass('empty');
            $(this).removeData('company');
            $(this).removeAttr('data-company-id');
        }
    });
};

/**
 * Get company data by ID
 * @param {string} companyId - The company ID to look up
 * @returns {Object|null} The company data or null if not found
 */
window.getCompanyById = function(companyId) {
    return window.SentiStockData.companies[companyId] || null;
};

/**
 * Get company data by name
 * @param {string} companyName - The company name to look up
 * @returns {Object|null} The company data or null if not found
 */
window.getCompanyByName = function(companyName) {
    for (const id in window.SentiStockData.companies) {
        if (window.SentiStockData.companies[id].name === companyName) {
            return {
                ...window.SentiStockData.companies[id],
                id: id
            };
        }
    }
    return null;
};

/**
 * Change the background based on the selected company
 * @param {string} companyNameOrId - The name or ID of the selected company
 */
window.changeBackground = function(companyNameOrId) {
    let companyData = null;
    
    // Find the company by ID or name
    if (window.SentiStockData.companies[companyNameOrId]) {
        // It's an ID
        companyData = window.SentiStockData.companies[companyNameOrId];
    } else {
        // It might be a name
        companyData = window.getCompanyByName(companyNameOrId);
    }
    
    // Get background from company data or use default
    const background = companyData ? companyData.background : window.SentiStockData.defaultBackground;
    
    // Apply the background
    $('body').css('background', background);
    
    // Optionally update other UI elements based on the selection
    if (companyData) {
        console.log(`Background changed for ${companyData.name}`);
    }
};

/**
 * Get all sectors
 * @returns {Array} Array of sectors
 */
window.getSectors = function() {
    const sectors = [];
    for (const id in window.SentiStockData.sectors) {
        sectors.push({
            id: id,
            ...window.SentiStockData.sectors[id]
        });
    }
    return sectors;
};

// Main application module
$(document).ready(function() {
    // Initialize the application
    initApp();
    setupChart();
});

/**
 * Initialize core application functionality
 */
function initApp() {
    // Refresh page on logo click
    $('.navbar-brand').click(function(e) {
        e.preventDefault();
        window.location.reload();
    });
    
    // Toggle overlay handler
    $('.toggleOverlay').click(function() {
        $('#overlay').toggle();
    });
}

/**
 * Set up the Chart.js visualization
 */
function setupChart() {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: 'Sentiment',
                data: [69, 45, 78, 92, 60, 59, 42],
                borderWidth: 1,
                borderDash: [5, 5],
                borderColor: '#fff'
            }, {
                label: 'Stock',
                data: [68, 59, 80, 81, 56, 55, 40],
                borderWidth: 1,
                borderColor: '#fff'
            }]
        },
        options: {
            plugins: {
                legend: { labels: { color: '#fff' } },
                title: {
                    display: true,
                    text: 'Sentiment vs. Stock',
                    color: '#fff',
                    font: { size: 18 }
                }
            },
            scales: {
                x: { ticks: { color: '#fff' }, title: { display: true, text: 'Month', color: '#fff' } },
                y: { ticks: { color: '#fff' }, title: { display: true, text: 'Value', color: '#fff' } }
            }
        }
    });
}