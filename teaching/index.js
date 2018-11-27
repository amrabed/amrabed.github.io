/**
 * Created by AmrAbed on 10/22/16
 */
populateNavbar(["philosophy", "courses", "training"], ["Email", "LinkedIn", "Twitter"]);
loadCourses("teaching.json", "#courses", "Courses Taught");
loadTraining("teaching.json", "#training", "Professional Training");

/** Load Courses
 *
 * @param file JSON file to read data from
 * @param id Target section ID
 * @param title Target section title
 */
function loadCourses(file, id, title) {
    d3.json(file).then(function (json) {
        const section = d3.select(id);

        setHeading(section, title);

        const row = section.append("div")
            .attr("class", "container")
            .selectAll("div")
            .data(json.items)
            .enter()
            .append("div")
            .attr("class", "row")
            .append("div")
            .attr("class", "col-lg-8 col-lg-offset-2");

        row.append("h4")
            .text(function (d) {
                return d.organization.name;
            });

        row.append("h5")
            .text(function (d) {
                return d.position;
            });

        row.append("p")
            .attr("class", "text-muted")
            .text(function (d) {
                return d.duration;
            });

        const item = row.append("ul")
            .attr("class", "list-unstyled")
            .selectAll("li")
            .data(function (d) {
                return d.courses;
            })
            .enter()
            .append("li");


        const chevron = item.append("a")
            .attr("class", "btn btn-link")
            .attr("data-toggle", "collapse")
            .attr("data-target", function (d) {
                return "#" + d.id;
            })
            .attr("aria-expanded", "false");

        chevron.append("span")
            .attr("class", "fas fa-chevron-right");
        chevron.append("span")
            .attr("class", "fas fa-chevron-down");

        item.append("em")
            .text(function (d) {
                return (d.code == null ? "" : d.code + ": ") + d.title +
                    (d.semester == null ? "" : " - " + d.semester) + " ";
            });

        item.append("a")
            .style("color", "inherit")
            .attr("class", "ml-2")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.link;
            })
            .style("display", function (d) {
                return d.link == null ? "none" : null;
            })
            .append("span")
            .attr("class", "fas fa-external-link-alt");

        item.append("div")
            .attr("class", "container")
            .attr("id", function (d) {
                return d.id;
            })
            .attr("class", "collapse out")
            .append("p")
            .attr("class", "text-muted text-justify")
            .append("em")
            .text(function (d) {
                return d.description;
            });
    });
}

/** Load Training
 *
 * @param file JSON file to read data from
 * @param id Target section ID
 * @param title Target section title
 */
function loadTraining(file, id, title) {
    d3.json(file).then(function (json) {
        const section = d3.select(id);

        setHeading(section, title);

        const row = section.append("div")
            .attr("class", "container")
            .selectAll("div")
            .data(json.training)
            .enter()
            .append("div")
            .attr("class", "row")
            .append("div")
            .attr("class", "col-lg-8 col-lg-offset-2");


        row.append("h4")
            .text(function (t) {
                return t.title;
            });
        row.append("h5")
            .text(function (t) {
                return t.center + " - " + t.institution;
            });

        row.append("p")
            .attr("class", "text-muted")
            .text(function (t) {
                return t.date;
            });
    });
}
