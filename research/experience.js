d3.json("experience.json", function (json) {
    var node = d3.select("#experience-items").selectAll("div")
        .data(json.items)
        .enter()
        .append("div")
        .attr("class", "container");

    node.append("h4")
        .text(function (d) {
            return d.position;
        });

    node.append("h5")
        .text(function (d) {
            return d.organization;
        });

    node.append("p")
        .attr("class", "text-muted")
        .text(function (d) {
            return d.duration;
        });

    // node.selectAll("label")
    //     .data(function (d) {
    //         return d.skills;
    //     })
    //     .enter()
    //     .append("label")
    //     .attr("class", "label label-primary")
    //     .text(function (d) {
    //         d.
    //
    //     })
});
