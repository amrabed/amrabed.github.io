/**
 * Created by AmrAbed on 10/22/16.
 */

/** Load Education Items
 *
 */
function loadEducation() {
    d3.json("education.json", function (json) {
        var section = d3.select("#education");

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

        degrees.append("h4")
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
}


/** Load Experience
 *
 */
function loadExperience() {
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
}

/** Load Skills
 *
 */
function loadSkills() {
    d3.json("skills.json", function (json) {
        var section = d3.select("#skills");

        setHeading(section, "Skills");

        var skill = section.append("div")
            .attr("class", "container-fluid")
            .append("svg")
            .attr("viewBox", "0 0 600 280")
            .selectAll("g")
            .data(json.skills)
            .enter()
            .append("g")
            .attr("data-toggle", "modal")
            .attr("data-target", function (d) {
                return "#" + (d.id ? d.id : d.label);
            })
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + (15 + d.y) + ")";
            })
            .on("mouseover", function () {
                var g = d3.select(this)
                    .each(function () {
                        /* Bring to front (based on gist.github.com/trtg/3922684) */
                        this.parentNode.appendChild(this);
                    });

                g.select("circle")
                    .attr("fill-opacity", 1)
                    .attr("r", function (d) {
                        return d.size * 1.3;
                    });

                g.select("text").attr("font-size", function (d) {
                    return d.size * 0.5;
                })
            })
            .on("mouseout", function () {
                var g = d3.select(this);

                g.select("circle")
                    .attr("fill-opacity", 0.85)
                    .attr("r", function (d) {
                        return d.size;
                    });

                g.select("text").attr("font-size", function (d) {
                    return d.size * 0.35;
                })
            });

        skill.append("circle")
            .attr("r", function (d) {
                return d.size;
            })
            .attr("fill-opacity", 0.85)
            .attr("fill", function (d) {
                return "#" + d.color;
            });

        skill.append("text")
            .style("fill", "white")
            .attr("text-anchor", "middle")
            .attr("dy", "0.3em")
            .attr("font-size", function (d) {
                return d.size * 0.35;
            })
            .text(function (d) {
                return d.label
            });

        var modal = section.data(json.skills)
            .enter()
            .append("div")
            .attr("id", function (d) {
                return d.id ? d.id : d.label;
            })
            .attr("class", "modal fade")
            .attr("tabindex", "-1")
            .attr("role", "dialog")
            .append("div")
            .attr("class", "modal-dialog modal-sm")
            .attr("role", "document")
            .append("div")
            .attr("class", "modal-content");

        modal.append("div")
            .attr("class", "modal-header")
            .append("h4")
            .attr("class", "modal-title")
            .text(function (d) {
                return d.label + " - Sample Projects";
            });

        modal.append("div")
            .attr("class", "modal-body")
            .selectAll("p")
            .data(function (d) {
                return d.projects;
            })
            .enter()
            .append("p")
            .attr("class", "text-center")
            .append("a")
            .attr("class", "btn btn-default")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.link;
            })
            .text(function (d) {
                return d.name;
            });

        // modal.append("div")
        //     .attr("class", "modal-body")
        //     .selectAll("p")
        //     .data(function (d) {
        //         return d.projects;
        //     })
        //     .enter()
        //     .append("p")
        //     .attr("class", "text-center")
        //     .style("vertical-align", "middle")
        //     .append("a")
        //     .attr("class", "github-button")
        //     .attr("href", function (d) {
        //         return  d.code;
        //     })
        //     .attr("data-style", "mega")
        //     .attr("aria-label", function (d) {
        //         return d.name + " on Github"
        //     })
        //     .text(function (d) {
        //         return d.name;
        //     })
        // && show_buttons();

    });
}

$.when($.getScript("include.js"), $.getScript("style/js/timeline.js"), $.getScript("style/js/github-button.js")).done(function () {
    populateNavbar();
    loadEducation();
    loadExperience();
    loadSkills();
});

/* Footer */
$("#footer").load("footer.html");