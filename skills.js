var svg = d3.select("#bubble-chart");

d3.json("skills.json", function (json) {
    var node = svg.selectAll("g")
        .data(json.nodes)
        .enter()
        .append("g")
        //.attr("class", "node")
        .attr("transform", function(d){return "translate("+ d.x +","+ d.y +")";});

    node.append("circle")
        .attr("r", function(d){return d.size;} )
        .attr("fill-opacity", 0.9)
        .attr("fill", function(d){return "#" + d.color;});

    node.append("text")
        .attr("text-anchor", "middle")
        .attr("style", "fill: #ffffff")
        .attr("dy", "0.3em")
        .attr("font-size", function(d){return d.size * 0.35;})
        .text(function(d){return d.label})
});
