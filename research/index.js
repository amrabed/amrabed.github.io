/**
 * Created by AmrAbed on 10/22/16.
 */

$.getScript("../include.js", function () {
    populateNavbar();
    loadResearchProjects("projects.json", "#projects", "Research Projects");
    loadPublications("publications.json", "#publications", "Publications");
    loadFooter("../footer.html")
});

// Show Github buttons
$.getScript("https://buttons.github.io/buttons.js");

// show Altmetric badges
$.getScript("https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js");

