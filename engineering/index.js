/**
 * Created by AmrAbed on 10/22/16
 */
populateNavbar(["positions"], ["Email", "LinkedIn", "GitHub", "Stack Overflow", "Twitter"]);
loadEngineeringPositions("projects.json", "#positions", "Positions");
// loadResearchProjects("../research/projects.json", "#projects", "Research Projects");
// loadProducts("projects.json", "#products", "Products");
// $.getScript("https://buttons.github.io/buttons.js");
/** Load Engineering Positions
 *
 * @param file JSON file to read data from
 * @param id Target section ID
 * @param title Target section title
 */
function loadEngineeringPositions(file, id, title) {
    d3.json(file, function (json) {
        const positions = d3.select(id);

        setHeading(positions, title);

        const row = positions.append("div").attr("class", "container")
            .selectAll("div")
            .data(json.positions)
            .enter()
            .append("div")
            .attr("class", "row mx-auto mb-4");

        const project = row.append("div").attr("class", "col-md-8");

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


        const organization = row.append("div").attr("class", "col-md-2");

        organization.selectAll("a")
            .data(function (d) {
                return d.organization;
            })
            .enter()
            .append("a")
            .attr("href", function (d) {
                return d.url ? d.url : "";
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
            });
        // .style("width: 128px;");

        const details = row.append("div").attr("class", "col-md-10 col-md-offset-1");

        details.append("p")
            .attr("class", "list-inline")
            .selectAll("li")
            .data(function (d) {
                return d.skills;
            })
            .enter()
            .append("li")
            .attr("class", "list-inline-item")
            .append("span")
            .attr("class", "badge badge-info p-2")
            .text(function (d) {
                return d;
            });

        const chevron = details.append("a")
            .attr("class", "btn btn-link")
            .attr("data-toggle", "collapse")
            .attr("data-target", function (d) {
                return "#" + d.id;
            })
            .attr("aria-expanded", "false");

        chevron.append("span")
            .attr("class", "fas fa-chevron-right");
        chevron.append("span")
            .attr("class", "fas fa-chevron-down");

        chevron.append("span").attr("class", "pl-2").text("Details");


        details.append("div")
            .attr("class", "row")
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

        positions.append("div")
            .attr("class", "container")
            .append("div")
            .attr("class", "row")
            .append("div")
            .attr("class", "col-md-10 col-md-offset-1")
            .append("h3")
            .attr("class", "text-muted")
            .text("Go to my Industry-funded Research Projects ")
            .append("a")
            .attr("href", "../research#projects")
            .append("i")
            .attr("class", "fas fa-external-link-alt");
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
        const products = d3.select(id);

        setHeading(products, title);

        const product = products.append("div")
            .attr("class", "container")
            .selectAll("div")
            .data(json.products)
            .enter()
            .append("div")
            .attr("class", "row")
            .append("div")
            .attr("class", "col-md-10 col-md-offset-1");

        const header = product.append("h3");

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
            .append("span")
            .attr("class", "badge badge-info p-2")
            .text(function (d) {
                return d;
            });
    });
}