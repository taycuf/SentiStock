// Refresh page on logo click
$(document).ready(function() {
    console.log("Hello")
    $('.navbar-brand').click(function(e) {
        e.preventDefault();
        window.location.reload();
    });

// Chart.js setup
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

// Toggle overlay
$('.toggleOverlay').click(function() {
    $('#overlay').toggle();
});

/**
 * Updates the company buttons with provided company names
 * @param {Array} companies - Array of company names to display
 */
function setCompanies(companies) {
    if (!Array.isArray(companies)) {
        console.error('setCompanies: companies parameter must be an array');
        return;
    }
    
    const buttons = $('#companies .btn-square');
    
    buttons.each(function(index) {
        const companyText = index < companies.length ? companies[index] : 'N/A';
        $(this).text(companyText);
    });
}

// Scroll to section
function scrollToSection(section) {
    $(section)[0].scrollIntoView({ behavior: 'smooth' });
}

// Dim section
function dim(section) {
    $(section).css({ transition: 'opacity 0.5s ease', opacity: '0.3' });
}

// Brighten section
function brighten(section) {
    $(section).css({ transition: 'opacity 0.5s ease', opacity: '1' });
}

/**
 * Changes the background based on the selected company
 * @param {string} company - The name of the selected company
 */
function changeBackground(company) {
    const body = $('body');
    const backgroundColors = {
        'Apple': 'red',
        'Microsoft': 'purple',
        'Salesforce': 'white',
        'Alphabet': 'linear-gradient(to right, #3a2f6b, #36669c, #41a0ae, #3ec995, #77f07f)',
        // Add more company backgrounds here as needed
    };
    
    // Default gradient if company not found
    const defaultGradient = 'linear-gradient(to right, #3a2f6b, #36669c, #41a0ae, #3ec995, #77f07f)';
    
    // Set background - use the company's color if it exists, otherwise use default
    body.css('background', backgroundColors[company] || defaultGradient);
}


});