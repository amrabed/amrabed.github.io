d3.json("courses.json", function (json) {
    var row = d3.select("#course-items")
        .selectAll("div")
        .data(json.items)
        .enter()
        .append("div")
        .attr("class", "row");

    row.append("h4")
        .text(function (d) {
            return d.position;
        });

    row.append("a")
        .attr("target", "_blank")
        .attr("href", function (d) {
            return d.organization.url;
        })
        .append("h4")
        .text(function (d) {
            return d.organization.name;
        });

    row.append("p")
        .attr("class", "text-muted")
        .text(function (d) {
            return d.duration;
        });
        // .append("ul")
        // .selectAll("li")
        // .data(function (d) {
        //     return d.tasks;
        // })
        // .enter()
        // .append("li")
        // .text(function (d) {
        //     return d;
        // });


    row.append("p")
        .selectAll("label")
        .data(function (d) {
            return d.courses;
        })
        .enter()
        .append("label")
        .attr("class", "label label-default")
        .attr("style", "margin-right: 5px;")
        .text(function (d) {
            return d;
        });
});
