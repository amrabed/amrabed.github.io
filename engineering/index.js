/**
 * Created by AmrAbed on 10/22/16
 */
populateNavbar(["positions", "projects"], ["Email", "LinkedIn", "GitHub", "Stack Overflow", "Twitter"]);
loadEngineeringPositions("positions.json", "#positions", "Positions");
loadProjects("projects.json", "#projects", "Open Source Projects");
$.getScript("https://buttons.github.io/buttons.js");

/** Load Engineering Positions
 *
 * @param file JSON file to read data from
 * @param id Target section ID
 * @param title Target section title
 */
function loadEngineeringPositions(file, id, title) {
    const positions = d3.select(id);
    setHeading(positions, title);

    d3.json(file).then(data => {
        const position = positions.append("div")
            .attr("class", "container")
            .selectAll("div")
            .data(data)
            .enter()
            .append("div")
            .attr("class", "row mx-auto mb-4")

        const heading = position.append("div")
            .attr("class", "col-md-10");

        heading.append("h4").text(d => d.position);

        heading.append("div")
            .selectAll("a")
            .data(d => d.organization)
            .enter()
            .append("a")
            .attr("href", d => d.url)
            .attr("target", "_blank")
            .append("h5")
            .text(d => d.name);

        heading.append("p")
            .attr("class", "text-muted")
            .text(d => d.duration);

        position.append("div")
            .attr("class", "col-md-2")
            .selectAll("a")
            .data(d => d.organization)
            .enter()
            .append("a")
            .attr("href", d => d.url ? d.url : "")
            .attr("title", d => d.name)
            .attr("alt", d => d.name)
            .attr("target", "_blank")
            .append("img")
            .attr("src", d => d.logo)
            .style("height:50px");

        const details = position.append("div").attr("class", "col-md-12 col-md-offset-1");

        details.append("p")
            .attr("class", "list-inline")
            .selectAll("li")
            .data(d => d.skills)
            .enter()
            .append("li")
            .attr("class", "list-inline-item")
            .append("span")
            .attr("class", "badge badge-info p-2")
            .text(d => d);

        const chevron = details.append("a")
            .attr("class", "btn btn-link")
            .attr("data-toggle", "collapse")
            .attr("data-target", d => "#" + d.id)
            .attr("aria-expanded", "false");

        chevron.append("span")
            .attr("class", "fas fa-chevron-right");
        chevron.append("span")
            .attr("class", "fas fa-chevron-down");

        chevron.append("span").attr("class", "pl-2").text("Details");


        details.append("div")
            .attr("class", "row")
            .attr("id", d => d.id)
            .attr("class", "collapse out")
            .append("p")
            .append("em")
            .append("ul")
            .attr("class", "list list-default")
            .selectAll("li")
            .data(d => d.tasks)
            .enter()
            .append("li")
            .attr("class", "text-justify")
            .text(d => d);

        positions.append("div")
            .attr("class", "container")
            .append("div")
            .attr("class", "row")
            .append("div")
            .attr("class", "col-md-10 col-md-offset-1")
            .append("h3")
            .attr("class", "text-muted")
            .text("Go to my Industry-funded Research Projects ")
            .append("a")
            .attr("href", "../research#projects")
            .append("i")
            .attr("class", "fas fa-external-link-alt");
    });
}

/** Load Projects
 *
 * @param file JSON file to read data from
 * @param id Target section ID
 * @param title Target section title
 */
function loadProjects(file, id, title) {
    const projects = d3.select(id);
    setHeading(projects, title);

    d3.json(file).then(data => {
        const project = projects.append("div")
            .attr("class", "container")
            .selectAll("div")
            .data(data)
            .enter()
            .append("div")
            .attr("class", "row mx-auto mb-4")

        project.append("div")
            .attr("class", "col-md-10")
            .append("h3")
            .text(d => d.name)
            .append("p")
            .append("a")
            .attr("class", "github-button")
            .attr("href", d => "https://github.com/" + d.github)
            .attr("data-size", "large")
            .attr("aria-label", d => d.name + " on Github")
            .text(d => d.github);

        project.append("div")
            .style("display", d => d.app && d.status === "published" ? null : "none")
            .attr("class", "col-md-2")
            .append("a")
            .attr("target", "_blank")
            .attr("href", d => "https://play.google.com/store/apps/details?id=" + d.app)
            .append("img")
            .style("width", "150px")
            .attr("alt", "Get the app on Google Play Store")
            .attr("src", "../assets/img/google-play.png");

        let demo = project.append("div")
            .style("display", d => d.demo ? null : "none")
            .attr("class", "col-md-2")
        demo.append("a")
            .attr("target", "_blank")
            .attr("href", d => d.demo)
            .append("img")
            .style("width", "100px")
            .attr("text", "Watch a demo")
            .attr("alt", "Watch a demo")
            .attr("src", "../assets/img/youtube.png")
        demo.append("p")
            // .attr("class", "text-muted")
            .text("Watch a demo")


        // project.append("p")
        //     .attr("class", "text-muted")
        //     .text(d => "First released " + d.released);
        project.append("p")
            .attr("class", "col-md-12 col-md-offset-1 text-justify text-muted")
            .text(d => d.description)

        let tags = project.append("div")
            .attr("class", "col-md-12 col-md-offset-1")

        tags.append("span")
            .attr("class", "list-inline mr-2")
            .selectAll("li")
            .data(d => d.tags)
            .enter()
            .append("li")
            .attr("class", "list-inline-item")
            .append("span")
            .attr("class", "badge badge-info p-2")
            .text(d => d);

        tags.append("span")
            .attr("class", "list-inline")
            .selectAll("li")
            .data(d => d.tools)
            .enter()
            .append("li")
            .attr("class", "list-inline-item")
            .append("span")
            .attr("class", "badge badge-primary p-2")
            .text(d => d);

    });
}