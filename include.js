/**
 * Created by AmrAbed on 10/22/16.
 */
function populateNavbar() {
    d3.json("navbar.json", function (json) {
        //     var div = d3.select("#mainNav")
        //         .append("div")
        //         .attr("class", "container-fluid");
        //
        //     var header = div.append("div")
        //         .attr("class", "navbar-header");
        //
        //     var toggle = header.append("button")
        //         .attr("type", "button")
        //         .attr("class", "navbar-toggle collapsed")
        //         .attr("data-toggle", "collapse")
        //         .attr("data-target", "#menu-items");
        //
        //     toggle.append("span")
        //         .attr("class", "sr-only")
        //         .text("Toggle navigation");
        //
        //     toggle.append("i")
        //         .attr("class", "fa fa-bars");
        //
        //     header.selectAll("a")
        //         .data(json.header)
        //         .enter()
        //         .append("a")
        //         .attr("class", "navbar-brand page-scroll")
        //         .attr("href", function (d) {
        //             return d.url;
        //         }).text(function (d) {
        //         return d.title;
        //     });
        //
        //     var menu = div.append("div")
        //         .attr("class", "collapse navbar-collapse")
        //         .attr("id", "menu-items");
        //
        // menu.append("ul")
        //     .attr("class", "nav navbar-nav navbar-left")
        //     .selectAll("li")
        //     .data(json.left)
        //     .enter()
        //     .append("li")
        //     .append("a")
        //     .attr("class", "page-scroll")
        //     .attr("href", function (d) {
        //         return d.ref;
        //     })
        //     .text(function (d) {
        //         return d.title;
        //     });

        var menu = d3.select("#menu-items");
        menu.append("div")
            .attr("class", "nav navbar-nav navbar-right")
            .attr("style", "margin: 10px 5px")
            .selectAll("a")
            .data(json.right)
            .enter()
            .append("a")
            .attr("class", "image-link")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.url;
            })
            .append("img")
            .attr("class", "image-circle")
            .attr("style", "width:24px;margin-right:4px;")
            .attr("title", function (d) {
                return d.name;
            })
            .attr("alt", function (d) {
                return d.name;
            })
            .attr("src", function (d) {
                return d.icon;
            });
    });
}

function setHeading(section, title) {
    var heading = section.append("div")
        .attr("class", "container-fluid")
        .append("div")
        .attr("class", "row text-center");

    heading.append("h2")
        .attr("class", "section-heading")
        .text(title);

    heading.append("hr")
        .attr("class", "primary");
}

function getContainer(parent, type) {
    return parent.append("div").attr("class", type);
}

/** Load Education Items
 *
 * @param file JSON file to read data from
 * @param id Target section ID
 * @param title to be used for the section heading
 */
function loadEducation(file, id, title) {
    d3.json(file, function (json) {
        var section = d3.select(id);

        setHeading(section, title);

        // Workaround to center content vertically
        section.append("div")
            .attr("class", "hidden-sm hidden-xs")
            .style("height", "200px");

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

        section.append("div")
            .attr("class", "hidden-sm hidden-xs")
            .style("height", "200px");
    });
}

/** Load Experience
 *
 * @param file JSON file to read data from
 * @param id Target section ID
 * @param title to be used for the section heading
 */
function loadExperience(file, id, title) {
    d3.json(file, function (json) {
        var section = d3.select(id);
        setHeading(section, title);

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
 * @param file JSON file to read data from
 * @param id Target section ID
 * @param title to be used for the section heading
 */
function loadSkills(file, id, title) {
    d3.json(file, function (json) {
        var section = d3.select(id);

        setHeading(section, title);

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
        // && show_github_buttons();

    });
}

/** Load Courses
 *
 * @param file JSON file to read data from
 * @param id Target section ID
 * @param title Target section title
 */
function loadCourses(file, id, title) {
    d3.json(file, function (json) {
        var section = d3.select(id);

        setHeading(section, title);

        var row = section.append("div")
            .attr("class", "container")
            .selectAll("div")
            .data(json.items)
            .enter()
            .append("div")
            .attr("class", "row")
            .append("div")
            .attr("class", "col-lg-8 col-lg-offset-2");

        row.append("h3")
            .text(function (d) {
                return d.organization.name;
            });

        row.append("ul")
            .attr("class", "list-unstyled")
            .selectAll("li")
            .data(function (d) {
                return d.courses;
            })
            .enter()
            .append("li")
            .append("h4")
            .text(function (d) {
                return d.title + " ";
            })
            .append("a")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.link;
            })
            .style("display", function (d) {
                return d.link == null ? "none" : null;
            })
            .append("i")
            .attr("class", "fa fa-external-link");
    });
}

function loadFooter(file) {
    $("#footer").load(file);
}