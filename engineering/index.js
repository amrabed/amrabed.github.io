/**
 * Created by AmrAbed on 10/22/16.
 */

$.when($.getScript("../include.js"), $.getScript("../style/js/github-button.js")).done(function () {
    populateNavbar();
    loadEngineeringPositions("projects.json", "#positions", "Positions");
    loadResearchProjects("../research/projects.json", "#projects", "Research Projects");
    loadProducts("projects.json", "#products", "Products");
});

/* Footer */
$("#footer").load("../footer.html");