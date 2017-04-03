/**
 * Created by AmrAbed on 10/22/16
 */
populateNavbar("../social.json", ["Email", "LinkedIn", "GitHub", "Stack Overflow", "Twitter"]);
loadEngineeringPositions("projects.json", "#positions", "Positions");
// loadResearchProjects("../research/projects.json", "#projects", "Research Projects");
loadProducts("projects.json", "#products", "Products");
loadFooter();
$.getScript("https://buttons.github.io/buttons.js");
/** Load Enginineering Positions
 *
 * @param file JSON file to read data from
 * @param id Target section ID
 * @param title Target section title
 */
function loadEngineeringPositions(file, id, title) {
    d3.json(file, function (json) {
        var positions = d3.select(id);

        setHeading(positions, title);

        var row = getContainer(positions, "container")
            .selectAll("div")
            .data(json.positions)
            .enter()
            .append("div")
            .attr("class", "row");

        var header = row.append("div")
            .attr("class", "col-md-10 col-md-offset-1");

        var project = getContainer(header, "col-md-8");

        project.append("h3")
            .text(function (d) {
                return d.position;
            });

        project.append("a")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.project.url;
            })
            .append("h4")
            .text(function (d) {
                return d.project.name;
            });

        project.append("p")
            .attr("class", "text-muted")
            .text(function (d) {
                return d.duration;
            });


        var organization = getContainer(header, "col-md-2");

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


        var details = row.append("div").attr("class", "col-md-10 col-md-offset-1");

        details.append("a")
            .attr("class", "btn btn-link")
            .attr("data-toggle", "collapse")
            .attr("data-target", function (d) {
                return "#" + d.id;
            })
            .text("+ Details");

        getContainer(details, "row")
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
            .attr("class", "text-justify")
            .text(function (d) {
                return d;
            });

        details.append("p")
            .attr("class", "list-inline")
            .selectAll("li")
            .data(function (d) {
                return d.skills;
            })
            .enter()
            .append("li")
            .append("label")
            .attr("class", "label label-info")
            .style("margin-right", "-5px")
            .text(function (d) {
                return d;
            });

        positions.append("div")
            .attr("class", "container")
            .append("div")
            .attr("class", "row")
            .append("div")
            .attr("class", "col-md-10 col-md-offset-1")
            .append("h3")
            .attr("class", "text-muted")
            .text("Go to my Research Projects ")
            .append("a")
            .attr("href", "../research#projects")
            .append("i")
            .attr("class", "fa fa-long-arrow-right");
    });
}

/** Load Products
 *
 * @param file JSON file to read data from
 * @param id Target section ID
 * @param title Target section title
 */
function loadProducts(file, id, title) {
    d3.json(file, function (json) {
        var products = d3.select(id);

        setHeading(products, title);

        var product = products.append("div")
            .attr("class", "container")
            .selectAll("div")
            .data(json.products)
            .enter()
            .append("div")
            .attr("class", "row")
            .append("div")
            .attr("class", "col-md-10 col-md-offset-1");

        var header = product.append("h3");

        header.append("a").append("em")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.url;
            })
            .text(function (d) {
                return d.name;
            });

        // product.append("p")
        //     .attr("class", "text-muted")
        //     .text(function (d) {
        //         return d.release;
        //     });
        // header.append("a")
        //     .style("display", function (d) {
        //         return d.playstore ? null : "none";
        //     })
        //     .attr("target", "_blank")
        //     .attr("href", function (d) {
        //         return d.playstore;
        //     })
        //     .append("img")
        //     .style("width", "150px")
        //     .attr("alt", "Get in on Google Play")
        //     .attr("src", "../assets/img/google-play-badge.png");

        product.append("p")
            .attr("class", "text-justify")
            .text(function (d) {
                return d.description;
            });

        product.append("div")
            .append("a")
            .attr("class", "github-button")
            .attr("href", function (d) {
                return d.url;
            })
            .attr("data-style", "mega")
            .attr("aria-label", function (d) {
                return d.name + " on Github"
            })
            .text(function (d) {
                return d.name;
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
            .attr("class", "label label-info")
            .style("margin-right", "-5px")
            .text(function (d) {
                return d;
            });
    });
}