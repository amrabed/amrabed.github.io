/**
 * Created by AmrAbed on 10/22/16.
 */
$.getScript("include.js", function () {

    populateNavbar();

    /* Education Section */
    d3.json("education.json", function (json) {
        var section = d3.select("#education");

        setHeading(section, "Education");

        var entry = section.append("div")
            .append("div")
            .attr("class", "row")
            .selectAll("div")
            .data(json.items)
            .enter()
            .append("div")
            .attr("class", "col-lg-4 col-md-6 text-center")
            .append("div")
            .attr("class", "service-box");

        entry.append("img")
            .attr("src", "style/img/education/education.png");

        entry.append("h3")
            .text(function (d) {
                return d.degree
            });

        entry.append("p")
            .attr("class", "text-muted")
            .append("a")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.institute.url;
            }).text(function (d) {
            return d.institute.name;
        });

        entry.append("p")
            .attr("class", "text-muted")
            .text(function (d) {
                return d.time;
            })
    });

    /* Experience Section */
    d3.json("experience.json", function (json) {
        var a = d3.select("#experience")
            .append("div")
            .attr("class", "cotainer-fluid")
            .append("div")
            .attr("class", "row no-gutter")
            .selectAll("div")
            .data(json.items)
            .enter()
            .append("div")
            .attr("class", "col-lg-4 col-sm-6 portfolio-box")
            .append("a")
            .attr("href", function (d) {
                return d.ref;
            });

        a.append("img")
            .attr("class", "img-responsive")
            .attr("src", function (d) {
                return d.img;
            });

        a.append("div")
            .attr("class", "portfolio-box-caption")
            .append("div")
            .attr("class", "portfolio-box-caption-content")
            .append("div")
            .attr("class", "project-name")
            .text(function (d) {
                return d.text;
            });
    });

    /* Skills Section */
    d3.json("skills.json", function (json) {
        var section = d3.select("#skills");

        setHeading(section, "Skills");

        var node = section.append("div")
            .attr("class", "container-fluid")
            .append("svg")
            .attr("viewBox", "0 0 600 280")
            .selectAll("g")
            .data(json.nodes)
            .enter()
            .append("g")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        node.append("circle")
            .attr("r", function (d) {
                return d.size;
            })
            .attr("fill-opacity", 0.9)
            .attr("fill", function (d) {
                return "#" + d.color;
            });

        node.append("text")
            .attr("text-anchor", "middle")
            .attr("style", "fill: #ffffff")
            .attr("dy", "0.3em")
            .attr("font-size", function (d) {
                return d.size * 0.35;
            })
            .text(function (d) {
                return d.label
            })
    });
});

/* Footer */
$("#footer").load("footer.html");