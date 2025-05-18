// Refresh page on logo click
$(document).ready(function() {
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

// Set company buttons
function setCompanies(companies) {
    $('#companies .btn-square').each(function(index) {
        $(this).text(index < companies.length ? companies[index] : 'N/A');
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

// Change body background
function changeBackground(company) {
    const body = $('body');
    switch (company) {
        case 'Apple':
            body.css('background', 'red');
            break;
        case 'Microsoft':
            body.css('background', 'purple');
            break;
        case 'Salesforce':
            body.css('background', 'white');
            break;
        case 'Alphabet':
            body.css('background', 'linear-gradient(to right, #3a2f6b, #36669c, #41a0ae, #3ec995, #77f07f)');
            break;
        default:
            body.css('background', 'linear-gradient(to right, #3a2f6b, #36669c, #41a0ae, #3ec995, #77f07f)');
    }
}


});