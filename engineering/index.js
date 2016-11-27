/**
 * Created by AmrAbed on 10/22/16.
 */

$.getScript("../include.js", function () {
    populateNavbar();
    loadEngineeringPositions("projects.json", "#positions", "Positions");
    loadResearchProjects("../research/projects.json", "#projects", "Research Projects");
    loadProducts("projects.json", "#products", "Products");
    loadFooter("../footer.html")
});

// Show Github buttons
$.getScript("https://buttons.github.io/buttons.js");
