/**
 * Created by AmrAbed on 10/22/16
 */
populateNavbar(["education", "experience", "skills"], ["Email", "LinkedIn", "GitHub", "Google Scholar", "Twitter"], "black");
loadEducation("education.json", "#education", "Education");
loadExperience("experience.json", "#experience", "Experience");
loadSkills("skills.json", "#skills", "Technical Skills");

/** Load Education Items
 *
 * @param file JSON file to read data from
 * @param id Target section ID
 * @param title to be used for the section heading
 */
function loadEducation(file, id, title) {
    d3.json(file).then(function (json) {
        const section = d3.select(id);

        setHeading(section, title);

        // Workaround to center content vertically
        section.append("div")
            .attr("class", "hidden-sm hidden-xs")
            .style("height", "200px");

        const degrees = section.append("div")
            .attr("class", "container-fluid align-middle")
            .append("div").attr("class", "row")
            .selectAll("div")
            .data(json.degrees)
            .enter()
            .append("div")
            .attr("class", "col-lg-4 col-md-6 text-center")
            .append("div")
            .attr("class", "service-box mt-5 mx-auto");

        degrees.append("img")
            .attr("src", "assets/img/education.png");

        degrees.append("h4")
            .text(function (d) {
                return d.degree
            });

        degrees.append("h5")
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
    d3.json(file).then(function (json) {
        const section = d3.select(id);
        setHeading(section, title);

        const t = section.append("div")
            .attr("class", "cd-horizontal-timeline");

        const timeline = t.append("div")
            .attr("class", "timeline");

        const events = timeline.append("div")
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

        const li = t.append("div")
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

        li.append("h4")
            .attr("class", "py-1")
            .append("a")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.organization.url;
            })
            .text(function (d) {
                return d.organization.name;
            });

        li.append("h5")
            .attr("class", "text-muted font-italic py-1")
            .text(function (d) {
                return d.duration;
            });

        initTimeline(t);


        const a = section.append("div")
            .attr("class", "p-0")
            .append("div")
            .attr("class", "container-fluid p-0")
            .append("div")
            .attr("class", "row no-gutter popup-gallery")
            .selectAll("div")
            .data(json.items)
            .enter()
            .append("div")
            .attr("class", "col-md-4 col-sm-6 p-0")
            .append("a")
            .attr("class", "portfolio-box")
            .attr("href", function (d) {
                return d.ref;
            });

        a.append("img")
            .attr("class", "img-fluid")
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
    d3.json(file).then(function (json) {
        const section = d3.select(id);

        setHeading(section, title);

        const skill = section.append("div")
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
                const g = d3.select(this)
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
                const g = d3.select(this);

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

        const modal = section.data(json.skills)
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
            .append("h5")
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
        //     .assets("vertical-align", "middle")
        //     .append("a")
        //     .attr("class", "github-button")
        //     .attr("href", function (d) {
        //         return  d.code;
        //     })
        //     .attr("data-assets", "mega")
        //     .attr("aria-label", function (d) {
        //         return d.name + " on Github"
        //     })
        //     .text(function (d) {
        //         return d.name;
        //     })
        // && show_github_buttons();
    });
}