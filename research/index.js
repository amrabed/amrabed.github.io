/**
 * Created by AmrAbed on 10/22/16.
 */
$.getScript("../include.js", function () {

    populateNavbar();

    /* Projects Section */
    d3.json("projects.json", function (json) {
        var section = d3.select("#projects");

        setHeading(section, "Research Projects");

        var row = section.append("div")
            .attr("class", "container")
            .selectAll("div")
            .data(json.items)
            .enter()
            .append("div")
            .attr("class", "row");

        var details = getContainer(row, "col-lg-10 col-md-12");

        details.append("h3")
            .text(function (d) {
                return d.project;
            });

        details.append("h4")
            .text(function (d) {
                return d.position;
            });

        details.append("a")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.organization.url;
            })
            .append("h4")
            .text(function (d) {
                return d.organization.name;
            });

        details.append("p")
            .attr("class", "text-muted")
            .text(function (d) {
                return d.duration;
            });


        details.append("p")
            .selectAll("label")
            .data(function (d) {
                return d.skills;
            })
            .enter()
            .append("label")
            .attr("class", "label label-default")
            .attr("style", "margin-right: 5px;")
            .text(function (d) {
                return d;
            });

        // node.append("p")
        //     .selectAll("a")
        //     .data(function (d) {
        //         return d.products;
        //     })
        //     .enter()
        //     .append("a")
        //     .attr("href", function (d) {
        //         return d.url;
        //     })
        //     .attr("title", function (d) {
        //         return d.name;
        //     })
        //     .attr("alt", function (d) {
        //         return d.name;
        //     })
        //     .attr("target", "_blank")
        //     .attr("style", "margin-right: 5px;")
        //     .text(function (d) {
        //         return d.name;
        //     });

        var sponsors = getContainer(row, "col-lg-2 text-center");

        sponsors.append("h6")
            .attr("class", "text-muted")
            .text("Sponsor");

        sponsors.selectAll("a")
            .data(function (d) {
                return d.sponsors;
            })
            .enter()
            .append("p")
            .append("a")
            .attr("href", function (d) {
                return d.url;
            })
            .attr("title", function (d) {
                return d.name;
            })
            .attr("alt", function (d) {
                return d.name;
            })
            .attr("target", "_blank")
            .attr("style", "margin-right: 5px;")
            .append("img")
            .attr("src", function (d) {
                return d.logo;
            })
            .attr("style", "width: 100px;height:50px;");

    });


    /* Publications Section */
    d3.json("publications.json", function (json) {
        var section = d3.select("#publications");

        setHeading(section, "Publications");

        var node = section.append("div")
            .attr("class", "container")
            .selectAll("div")
            .data(json.items)
            .enter()
            .append("div")
            .attr("class", "container");

        node.append("a")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.doi;
            })
            .append("h3")
            .text(function (d) {
                return d.title;
            });

        node.append("h4")
            .text(function (d) {
                return d.authors;
            });

        node.append("p")
            .attr("class", "text-muted")
            .text(function (d) {
                return d.venue;
            });

        node.append("p")
            .selectAll("label")
            .data(function (d) {
                return d.keywords;
            })
            .enter()
            .append("label")
            .attr("class", "label label-primary")
            .attr("style", "margin-right: 5px;")
            .text(function (d) {
                return d;
            });

    });

    /* Presentations Section */
    d3.json("publications.json", function (json) {
        var section = d3.select("#presentations");

        setHeading(section, "Presentations");

        //ToDo: Fill section
    });
});

/* Footer */
$("#footer").load("../footer.html");