/**
 * Created by AmrAbed on 10/22/16.
 */
$.getScript("../include.js", function () {

    populateNavbar();

    /* Projects Section */
    d3.json("projects.json", function (json) {
        var section = d3.select("#projects");

        setHeading(section, "Projects");

        var media = getContainer(section, "container")
            .selectAll("div")
            .data(json.items)
            .enter()
            .append("div")
            .attr("class", "media");

        var project = getContainer(media, "media-body");

        project.append("a")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.project.url;
            })
            .append("h3")
            .text(function (d) {
                return d.project.name;
            });

        project.append("h4")
            .text(function (d) {
                return d.position;
            });

        project.append("p")
            .attr("class", "text-muted")
            .text(function (d) {
                return d.duration;
            });


        project.append("p")
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

        var organization = getContainer(media, "media-right media-middle");

        organization.selectAll("a")
            .data(function (d) {
                return d.organization;
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
            .append("img")
            .attr("src", function (d) {
                return d.logo;
            })
            .attr("style", "width: 150px;");

    // });

    /* Projects Section */
    // d3.json("freelance.json", function (json) {
    //     var freelancing = d3.select("#freelancing");
    //
    //     setHeading(freelancing, "Freelancing Products");
    //
    //     var container = getContainer(freelancing, "container");
    //
    //     var node = freelancing.append("div")
    //         .attr("class", "container")
    //         .selectAll("div")
    //         .data(json.freelancing)
    //         .enter()
    //         .append("div")
    //         .attr("class", "row");
    //
    //     node.append("a")
    //         .attr("target", "_blank")
    //         .attr("href", function (d) {
    //             return d.product.url;
    //         })
    //         .append("h3")
    //         .text(function (d) {
    //             return d.product.name;
    //         });
    //
    //     node.append("h4")
    //         .text(function (d) {
    //             return d.product.type;
    //         });
    //
    //     node.append("p")
    //         .attr("class", "text-muted")
    //         .text(function (d) {
    //             return "Releases " + d.product.release;
    //         });
    //
    //     node.append("p")
    //         .selectAll("label")
    //         .data(function (d) {
    //             return d.skills;
    //         })
    //         .enter()
    //         .append("label")
    //         .attr("class", "label label-primary")
    //         .attr("style", "margin-right: 5px;")
    //         .text(function (d) {
    //             return d;
    //         });
    });


});

/* Footer */
$("#footer").load("../footer.html");