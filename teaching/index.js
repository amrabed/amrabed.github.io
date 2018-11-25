/**
 * Created by AmrAbed on 10/22/16
 */
populateNavbar(["philosophy", "courses"], ["Email", "LinkedIn", "Twitter"]);
loadCourses("courses.json", "#courses", "Courses");

/** Load Courses
 *
 * @param file JSON file to read data from
 * @param id Target section ID
 * @param title Target section title
 */
function loadCourses(file, id, title) {
    d3.json(file, function (json) {
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

        row.append("h3")
            .text(function (d) {
                return d.organization.name;// + (d.department == null ? "" : " - " + d.department);
            });

        row.append("h4")
            .text(function (d) {
                return d.position;
            });

        row.append("p")
            .attr("class", "text-muted")
            .text(function (d) {
                return d.duration;
            });

        const item = row.append("em").append("ul")
            .attr("class", "list list-default")
            .selectAll("li")
            .data(function (d) {
                return d.courses;
            })
            .enter()
            .append("li")
            .append("h4")
            .text(function (d) {
                return (d.code == null ? "" : d.code + ": ") + d.title +
                    (d.semester == null ? "" : " - " + d.semester) + " ";
            });

        item.append("a")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.link;
            })
            .style("display", function (d) {
                return d.link == null ? "none" : null;
            })
            .append("i")
            .attr("class", "fa fa-external-link");

        item.append("a")
            .attr("class", "btn btn-link")
            .attr("data-toggle", "collapse")
            .attr("data-target", function (d) {
                return "#" + d.id;
            })
            .style("display", function (d) {
                return d.description == null ? "none" : "";
            })
            .text("+");

        item.append("div")
            .attr("class", "container")
            .attr("id", function (d) {
                return d.id;
            })
            .attr("class", "collapse out")
            .append("p")
            .attr("class", "text-justify")
            .append("em")
            .text(function (d) {
                return d.description;
            });
    });
}
