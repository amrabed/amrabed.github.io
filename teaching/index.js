/**
 * Created by AmrAbed on 10/22/16.
 */
$.getScript("../include.js", function () {

    populateNavbar();

    /* Experience Section */
    d3.json("courses.json", function (json) {
        var section = d3.select("#experience");

        setHeading(section, "Teaching Experience");

        var row = section.append("div")
            .attr("class", "container")
            .selectAll("div")
            .data(json.items)
            .enter()
            .append("div")
            .attr("class", "row")
            .append("div")
            .attr("class", "col-lg-12");

        row.append("a")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.organization.url;
            })
            .append("h4")
            .text(function (d) {
                return d.organization.name;
            });

        row.append("h4")
            .text(function (d) {
                return d.position;
            });

        row.append("h4")
            .attr("class", "text-muted")
            .text(function (d) {
                return d.duration;
            });

        // row.selectAll("p")
        //     .data(function (d) {
        //         return d.tasks;
        //     })
        //     .enter()
        //     .append("p")
        //     .text(function (d) {
        //         return d;
        //     });

        row.append("p")
            .attr("class", "list-inline")
            .selectAll("li")
            .data(function (d) {
                return d.courses;
            })
            .enter()
            .append("li")
            .append("label")
            .attr("class", "label label-default")
            .attr("style", "margin-right: -5px;")
            .text(function (d) {
                return d;
            });
    });
});

/* Footer */
$("#footer").load("../footer.html");