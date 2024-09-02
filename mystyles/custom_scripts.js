// Custom script for handling submenu collapse on hover
/*
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
});*/

/*
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.toggle').forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default anchor behavior
            const submenu = this.nextElementSibling;
            submenu.classList.toggle('show');
        });
    });
});*/

// Function to load HTML content dynamically
function loadHTML(elementId, file, callback) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
      if (callback) callback(); // Call the callback function if provided
    });
}

// Load HTML content into header and footer
loadHTML("header", "/common/header.html");
loadHTML("footer", "/common/footer.html", function () {
  // Set the current date after the footer has loaded
  const d = new Date();
  document.getElementById("date").innerHTML = d.toLocaleDateString();
});

$(document).ready(function () {
  // Target your .container, .wrapper, .post, etc.
  $(".media").fitVids();
});

/* FAVICON! */
function setFavicon(iconUrl, iconType = "image/x-icon") {
  // Check if a favicon link already exists
  let existingFavicon = document.querySelector('link[rel="icon"]');

  if (!existingFavicon) {
    // Create a new link element for the favicon
    existingFavicon = document.createElement("link");
    existingFavicon.rel = "icon";
    document.head.appendChild(existingFavicon);
  }

  // Set the href and type of the favicon link
  existingFavicon.href = iconUrl;
  existingFavicon.type = iconType;
}

// Set your favicon (Update the path and type as needed)
setFavicon("/mypics/logo/starfleet.png");
