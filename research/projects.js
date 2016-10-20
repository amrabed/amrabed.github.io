d3.json("projects.json", function (json) {
    var row = d3.select("#project-items")
        .selectAll("div")
        .data(json.items)
        .enter()
        .append("div")
        .attr("class", "row");

    var details = row.append("div")
        .attr("class", "col-lg-10 col-md-12");

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

    var sponsors = row.append("div")
        .attr("class", "col-lg-2 col-md-12 text-center");

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
