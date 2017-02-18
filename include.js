/**
 * Created by AmrAbed on 10/22/16.
 */
function populateNavbar(file, accounts, color) {
    d3.json(file, function (json) {
        //     var div = d3.select("#mainNav")
        //         .append("div")
        //         .attr("class", "container-fluid");
        //
        //     var header = div.append("div")
        //         .attr("class", "navbar-header");
        //
        //     var toggle = header.append("button")
        //         .attr("type", "button")
        //         .attr("class", "navbar-toggle collapsed")
        //         .attr("data-toggle", "collapse")
        //         .attr("data-target", "#menu-items");
        //
        //     toggle.append("span")
        //         .attr("class", "sr-only")
        //         .text("Toggle navigation");
        //
        //     toggle.append("i")
        //         .attr("class", "fa fa-bars");
        //
        //     header.selectAll("a")
        //         .data(json.header)
        //         .enter()
        //         .append("a")
        //         .attr("class", "navbar-brand page-scroll")
        //         .attr("href", function (d) {
        //             return d.url;
        //         }).text(function (d) {
        //         return d.title;
        //     });
        //
        //     var menu = div.append("div")
        //         .attr("class", "collapse navbar-collapse")
        //         .attr("id", "menu-items");
        //
        // menu.append("ul")
        //     .attr("class", "nav navbar-nav navbar-left")
        //     .selectAll("li")
        //     .data(json.left)
        //     .enter()
        //     .append("li")
        //     .append("a")
        //     .attr("class", "page-scroll")
        //     .attr("href", function (d) {
        //         return d.ref;
        //     })
        //     .text(function (d) {
        //         return d.title;
        //     });

        var menu = d3.select("#menu-items");
        var span = menu.append("ul")
            .attr("class", "nav navbar-nav navbar-right")
            .style("margin", "10px 0px")
            .selectAll("a")
            .data(json.accounts.filter(function(obj) {
                return accounts.indexOf(obj.name) > -1;
            }))
            .enter()
            .append("a")
            .style("color", color)
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.url;
            })
            .attr("title", function (d) {
                return d.name;
            })
            .append("span")
            .attr("class", "fa-stack");

        span.append("i")
            .attr("class", "fa fa-circle fa-stack-2x");
        span.append("i")
            .attr("class", function (d) {
                return "fa " +d.icon + " fa-stack-1x fa-inverse";
            });
    });
}

function setHeading(section, title) {
    var heading = section.append("div")
        .attr("class", "container-fluid")
        .append("div")
        .attr("class", "row text-center");

    heading.append("h2")
        .attr("class", "section-heading")
        .text(title);

    heading.append("hr")
        .attr("class", "primary");
}

function getContainer(parent, type) {
    return parent.append("div").attr("class", type);
}

function loadFooter(file) {
    $("#footer").load(file);
}