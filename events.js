// Event listeners
$('.sector').click(function() {
    dim('#sectors');
    scrollToSection('#companies');
    brighten('#companies');
});

$('#c_back').click(function() {
    scrollToSection('#sectors');
    brighten('#sectors');
    dim('#companies');
    changeBackground(''); // Reset to default gradient
});

$('#r_back').click(function() {
    scrollToSection('#companies');
    brighten('#companies');
    dim('#results');
});

$('.company').click(function() {
    const selectedCompany = $(this).text().trim();
    dim('#companies');
    brighten('#results');
    scrollToSection('#results');
    $('#results h1').text(selectedCompany);
    changeBackground(selectedCompany);
});

$('#sb1').click(function() {
    setCompanies(['Microsoft', 'Salesforce', 'Apple', 'Alphabet']);
});

$('#sb3').click(function() {
    setCompanies(['Morgan Stanley', 'Goldman Sachs', 'JPM', 'Mastercard']);
});

$('#sb4').click(function() {
    setCompanies(['General Motors', 'Boeing', 'Ford', 'Tesla']);
});