// Custom script for handling submenu collapse on hover
$(document).ready(function() {
    $('.nav > li').hover(
        function() {
            // On hover: expand the submenu
            $(this).find('.collapse').collapse('show');
        }, function() {
            // On mouse leave: collapse the submenu
            $(this).find('.collapse').collapse('hide');
        }
    );
});

// Function to load HTML content dynamically
function loadHTML(elementId, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => document.getElementById(elementId).innerHTML = data);
}

// Load HTML content into header and footer
loadHTML('header', '/mystyles/header.html');
loadHTML('footer', '/mystyles/footer.html');

$(document).ready(function() {
    // Target your .container, .wrapper, .post, etc.
    $(".media").fitVids();
});