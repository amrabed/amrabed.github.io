/**
 * Created by AmrAbed on 10/22/16.
 */

$.when($.getScript("../include.js"), $.getScript("../style/js/github-button.js")).done(function () {
        populateNavbar();
        loadResearchProjects("projects.json", "#projects", "Research Projects");
        loadPublications("publications.json", "#publications", "Publications");

});

/* Footer */
$("#footer").load("../footer.html");