/**
 * Created by AmrAbed on 10/22/16.
 */
function populateNavbar() {
    d3.json("navbar.json", function (json) {
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
        menu.append("div")
            .attr("class", "nav navbar-nav navbar-right")
            .attr("style", "margin: 10px 5px")
            .selectAll("a")
            .data(json.right)
            .enter()
            .append("a")
            .attr("class", "image-link")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.url;
            })
            .append("img")
            .attr("class", "image-circle")
            .attr("style", "width:24px;margin-right:4px;")
            .attr("title", function (d) {
                return d.name;
            })
            .attr("alt", function (d) {
                return d.name;
            })
            .attr("src", function (d) {
                return d.icon;
            });
    });
}

function setHeading(section, title) {
    var heading = section.append("div")
        .attr("class", "container-fluid")
        .append("div")
        .attr("class", "row")
        .append("div")
        .attr("class", "col-lg-8 col-lg-offset-2 text-center");

    heading.append("h2")
        .attr("class", "section-setHeading")
        .text(title);

    heading.append("hr")
        .attr("class", "primary");
}

function getContainer(parent, type) {
    return parent.append("div").attr("class", type);
}
