/**
 * Created by AmrAbed on 10/22/16.
 */

$.when($.getScript("include.js"), $.getScript("style/js/timeline.js")).done(function () {
    populateNavbar();

    /* Education Section */
    d3.json("education.json", function (json) {
        var section = d3.select("#education")
            .append("div");

        setHeading(section, "Education");

        var degrees = section.append("div")
            .attr("class", "row")
            .selectAll("div")
            .data(json.degrees)
            .enter()
            .append("div")
            .attr("class", "col-lg-4 col-md-6 text-center")
            .append("div")
            .attr("class", "service-box");

        degrees.append("img")
            .attr("src", "style/img/education/education.png");

        degrees.append("h3")
            .text(function (d) {
                return d.degree
            });

        degrees.append("p")
            .attr("class", "text-muted")
            .append("a")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.institute.url;
            }).text(function (d) {
            return d.institute.name;
        });

        degrees.append("p")
            .attr("class", "text-muted")
            .text(function (d) {
                return d.time;
            });
    });

    /* Experience Section */
    d3.json("experience.json", function (json) {
        var section = d3.select("#experience");
        setHeading(section, "Experience");

        var t = section.append("div")
            .attr("class", "cd-horizontal-timeline");

        var timeline = t.append("div")
            .attr("class", "timeline");

        var events = timeline.append("div")
            .attr("class", "events-wrapper")
            .append("div")
            .attr("class", "events")
            .style("width", "18000px");

        events.append("ol")
            .selectAll("li")
            .data(json.positions)
            .enter()
            .append("li")
            .append("a")
            .attr("href", "#0")
            .attr("class", function (d) {
                if (d.selected) return "selected";
            })
            .attr("data-date", function (d) {
                return d.date;
            })
            .text(function (d) {
                return d.time;
            });

        events.append("span")
            .attr("class", "filling-line")
            .attr("aria-hidden", "true");

        timeline.append("ul")
            .attr("class", "cd-timeline-navigation")
            .selectAll("li")
            .data([{"text": "Prev", "class": "prev inactive"}, {"text": "Next", "class": "next"}])
            .enter()
            .append("li")
            .append("a")
            .attr("href", "#0")
            .attr("class", function (d) {
                return d.class;
            })
            .text(function (d) {
                return d.text;
            });

        var li = t.append("div")
            .attr("class", "events-content")
            .append("ol")
            .selectAll("li")
            .data(json.positions)
            .enter()
            .append("li")
            .attr("class", function (d) {
                if (d.selected) return "selected";
            })
            .attr("data-date", function (d) {
                return d.date;
            });

        li.append("h3")
            .text(function (d) {
                return d.position;
            });

        li.append("em")
            .append("a")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.organization.url;
            })
            .text(function (d) {
                return d.organization.name;
            });

        li.append("p")
            .text(function (d) {
                return d.duration;
            });

        initTimeline(t);


        var a = section.append("div")
            .attr("class", "cotainer-fluid no-padding")
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
            .style("fill", "#ffffff")
            .attr("text-anchor", "middle")
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