/**
 * Created by AmrAbed on 10/22/16.
 */
$.getScript("../include.js", function () {

    populateNavbar();

    /* Presentations Section */
    d3.json("presentations.json", function (json) {
        var section = d3.select("#bio");
        // setHeading(section, "Presentations");
        section.append("div")
            .attr("class", "container text-center")
            .selectAll("iframe")
            .data(json.presentations)
            .enter()
            .append("iframe")
            // .attr("frameborder", 0)
            // .attr("marginwidth", 0)
            // .attr("marginheight", 0)
            // .attr("scrolling", "no")
            .attr("allowfullscreen", "")
            .attr("width", 800)
            .attr("height", 600)
            .attr("style", "margin-top:5px; max-width: 100%")
            .attr("src", function (d) {
                return d.url;
            })
    });

    /* Projects Section */
    d3.json("projects.json", function (json) {
        var section = d3.select("#projects");

        setHeading(section, "Research Projects");

        var media = section.append("div")
            .attr("class", "container")
            .selectAll("div")
            .data(json.items)
            .enter()
            .append("div")
            .attr("class", "row");

        var details = getContainer(media, "col-lg-10");

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
            .append("em")
            .text("Code: ")
            .attr("class", "list-inline")
            .selectAll("li")
            .data(function (d) {
                return d.products;
            })
            .enter()
            .append("li")
            .append("a")
            .attr("class", "btn btn-default")
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
            .attr("style", "margin-right: -5px;")
            .text(function (d) {
                return d.name;
            });

        details.append("p")
            .append("em")
            .text("Keywords: ")
            .attr("class", "list-inline")
            .selectAll("li")
            .data(function (d) {
                return d.interests;
            })
            .enter()
            .append("li")
            .append("label")
            .attr("class", "label label-warning")
            .attr("style", "margin-right: -5px")
            .text(function (d) {
                return d;
            });

        details.append("p")
            .append("em")
            .text("Tools: ")
            .attr("class", "list-inline")
            .selectAll("li")
            .data(function (d) {
                return d.skills;
            })
            .enter()
            .append("li")
            .append("label")
            .attr("class", "label label-default")
            .attr("style", "margin-right: -5px")
            .text(function (d) {
                return d;
            });

        // var sponsors = getContainer(media, "media-right media-middle text-center");
        var sponsors = getContainer(media, "col-lg-2 media-middle");

        sponsors.append("h6")
            .attr("class", "text-muted")
            .text("Sponsor");

        sponsors.selectAll("a")
            .data(function (d) {
                return d.sponsors;
            })
            .enter()
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
            .attr("class", "row")
            .append("div")
            .attr("class", "col-lg-12");

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

        // node.append("p")
        //     .attr("class", "list list-inline")
        //     .selectAll("li")
        //     .data(function (d) {
        //         return d.keywords;
        //     })
        //     .enter()
        //     .append("li")
        //     .append("label")
        //     .attr("class", "label label-primary")
        //     .attr("style", "margin-right: -5px;")
        //     .text(function (d) {
        //         return d;
        //     });

        if(function (d) {return d.fulltext != null;}) {
            node.append("a")
                .attr("class", "btn btn-default")
                .attr("target", "_blank")
                .attr("href", function (d) {
                    return d.fulltext;
                })
                .text("Full text")
        }

    });
});

/* Footer */
$("#footer").load("../footer.html");