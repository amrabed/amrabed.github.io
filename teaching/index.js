populateNavbar(["philosophy", "courses", "training"], ["Email", "LinkedIn", "Twitter"]);
loadCourses("teaching.json", "#courses", "Courses Taught");
loadTraining("teaching.json", "#training", "Professional Training");

/**
 * Load Courses
 */
function loadCourses(file, id, title) {
    const section = d3.select(id);
    setHeading(section, title);

    d3.json(file).then(json => {
        const row = section.append("div")
            .attr("class", "container")
            .selectAll("div")
            .data(json.positions)
            .enter()
            .append("div")
            .attr("class", "row")
            .append("div")
            .attr("class", "col-lg-8 col-lg-offset-2");

        row.append("h4").text(d => d.organization.name);
        row.append("h5").text(d => d.position);
        row.append("p").attr("class", "text-muted").text(d => d.duration);

        const item = row.append("ul")
            .attr("class", "list-unstyled")
            .selectAll("li")
            .data(d => d.courses)
            .enter()
            .append("li");

        const chevron = item.append("a")
            .attr("class", "btn btn-link")
            .attr("data-bs-toggle", "collapse")
            .attr("data-bs-target", d => "#" + d.id)
            .attr("aria-expanded", "false");

        chevron.append("span")
            .attr("class", "fas fa-chevron-right");
        chevron.append("span")
            .attr("class", "fas fa-chevron-down");

        item.append("em").text(d => (d.code == null ? "" : d.code + ": ") + d.title +
            (d.semester == null ? "" : " - " + d.semester) + " ");

        item.append("a")
            .style("color", "inherit")
            .attr("class", "ml-2")
            .attr("target", "_blank")
            .attr("href", d => d.link)
            .style("display", d => d.link == null ? "none" : null)
            .append("span")
            .attr("class", "fas fa-external-link-alt");

        item.append("div")
            .attr("class", "container")
            .attr("id", d => d.id)
            .attr("class", "collapse out")
            .append("p")
            .attr("class", "text-muted text-justify")
            .append("em")
            .text(d => d.description);
    });
}

/**
 * Load Training
 */
function loadTraining(file, id, title) {
    const section = d3.select(id);
    setHeading(section, title);

    d3.json(file).then(json => {
        const row = section.append("div")
            .attr("class", "container")
            .selectAll("div")
            .data(json.training)
            .enter()
            .append("div")
            .attr("class", "row")
            .append("div")
            .attr("class", "col-lg-8 col-lg-offset-2");

        row.append("h4").text(t => t.title);
        row.append("h5").text(t => t.center + " - " + t.institution);
        row.append("p").attr("class", "text-muted").text(t => t.date);
    });
}