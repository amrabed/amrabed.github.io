/**
 * Created by AmrAbed on 10/22/16.
 */
$.getScript("../include.js", function () {

    populateNavbar();

    /* Projects Section */
    d3.json("projects.json", function (json) {
        var positions = d3.select("#positions");

        setHeading(positions, "Positions");

        var media = getContainer(positions, "container")
            .selectAll("div")
            .data(json.positions)
            .enter()
            .append("div")
            .attr("class", "row");

        var project = getContainer(media, "col-lg-10");

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

        project.append("a")
            .attr("class", "btn btn-link")
            .attr("data-toggle", "collapse")
            .attr("data-target", function (d) {
                return "#" + d.id;
            })
            .text("+ Details");

        getContainer(project, "row")
            .attr("id", function (d) {
                return d.id;
            })
            .attr("class", "collapse out")
            .append("p")
            .append("em")
            .append("ul")
            .attr("class", "list list-default")
            .selectAll("li")
            .data(function (d) {
                return d.tasks;
            })
            .enter()
            .append("li")
            .text(function (d) {
                return d;
            });

        project.append("p")
            .attr("class", "list-inline")
            .selectAll("li")
            .data(function (d) {
                return d.skills;
            })
            .enter()
            .append("li")
            .append("label")
            .attr("class", "label label-default")
            .style("margin-right", "-5px")
            .text(function (d) {
                return d;
            });

        var organization = getContainer(media, "col-lg-2");

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
            .style("width: 128px;");

        var products = d3.select("#products");

        setHeading(products, "Products");

        var product = getContainer(products, "container")
            .selectAll("div")
            .data(json.products)
            .enter()
            .append("div")
            .attr("class", "row")
            .append("div")
            .attr("class", "col-lg-12");

        product.append("a")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.url;
            })
            .append("h3")
            .text(function (d) {
                return d.name;
            });

        // product.append("h4")
        //     .text(function (d) {
        //         return d.position;
        //     });

        product.append("p")
            .attr("class", "text-muted")
            .text(function (d) {
                return d.release;
            });

        product.append("p")
            .text(function (d) {
                return d.description;
            });

        product.append("p")
            .attr("class", "list-inline")
            .selectAll("li")
            .data(function (d) {
                return d.skills;
            })
            .enter()
            .append("li")
            .append("label")
            .attr("class", "label label-default")
            .style("margin-right", "-5px")
            .text(function (d) {
                return d;
            });

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
        //         .style("margin-right: 5px;")
        //         .text(function (d) {
        //             return d;
        //         });
    });


});

/* Footer */
$("#footer").load("../footer.html");