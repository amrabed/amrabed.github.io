/**
 * Created by AmrAbed on 10/22/16.
 */
$.getScript("../include.js", function () {

    populateNavbar();

    /* Projects Section */
    d3.json("projects.json", function (json) {
        var section = d3.select("#projects");

        setHeading(section, "Projects");

        var container = getContainer(section, "container");

    });

    /* Projects Section */
    d3.json("freelance.json", function (json) {
        var section = d3.select("#freelancing");

        setHeading(section, "Freelancing");

        var container = getContainer(section, "container");

    });


});

/* Footer */
$("#footer").load("../footer.html");