d3.json("publications.json", function (json) {
    var node = d3.select("#publication-items").selectAll("div")
        .data(json.items)
        .enter()
        .append("div")
        .attr("class", "container");

    node.append("a")
        .attr("target", "_blank")
        .attr("href", function (d) {
            return d.doi;
        })
        .append("h4")
        .text(function (d) {
            return d.title;
        });

    node.append("h5")
        .text(function (d) {
            return d.authors;
        });

    node.append("p")
        .attr("class", "text-muted")
        .text(function (d) {
            return d.venue;
        });
});
