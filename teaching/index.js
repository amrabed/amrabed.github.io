/**
 * Created by AmrAbed on 10/22/16
 */
populateNavbar(["philosophy", "courses"], ["Email", "LinkedIn", "Twitter"]);
loadCourses("courses.json", "#courses", "Courses");
loadFooter();

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