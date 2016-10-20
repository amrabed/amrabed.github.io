d3.json("education.json", function (json) {
    var node = d3.select("#education-items").selectAll("div")
        .data(json.items)
        .enter()
        .append("div")
        .attr("class", "col-lg-4 col-md-6 text-center")
        .append("div")
        .attr("class", "service-box");

    node.append("img")
        .attr("src", "style/img/education/education.png");

    node.append("h3")
        .text(function (d) {
            return d.degree
        });

    node.append("p")
        .attr("class", "text-muted")
        .append("a")
        .attr("target", "_blank")
        .attr("href", function (d) {
            return d.institute.url;
        }).text(function (d) {
            return d.institute.name;
    });

    node.append("p")
        .attr("class", "text-muted")
        .text(function (d) {
            return d.time;
        })
});