/**
 * Created by AmrAbed on 10/22/16
 */
populateNavbar(["education", "certifications", "experience", "skills"], ["Email", "LinkedIn", "GitHub", "Google Scholar", "Twitter"], "black");
loadEducation("education.json", "#education", "Education");
loadCertifications("certifications.json", "#certifications", "Certifications");
loadExperience("experience.json", "#experience", "Experience");
loadSkills("skills.json", "#skills", "Technical Skills");

/**
 * Load Education Items
 */
function loadEducation(file, id, title) {
    const section = d3.select(id);
    setHeading(section, title);
    d3.json(file).then(data => {
        // Workaround to center content vertically
        section.append("div").attr("class", "hidden-sm hidden-xs").style("height", "200px");

        const degrees = section.append("div")
            .attr("class", "container-fluid align-middle")
            .append("div").attr("class", "row")
            .selectAll("div")
            .data(data)
            .enter()
            .append("div")
            .attr("class", "col-lg-4 col-md-6 text-center")
            .append("div")
            .attr("class", "service-box mt-5 mx-auto");

        degrees.append("img").attr("src", "assets/img/education.png");
        degrees.append("h4").text(d => d.degree);
        degrees.append("h5")
            .attr("class", "text-muted")
            .append("a")
            .attr("target", "_blank")
            .attr("href", d => d.institute.url)
            .text(d => d.institute.name);

        degrees.append("p").attr("class", "text-muted").text(d => d.time);
        section.append("div").attr("class", "hidden-sm hidden-xs").style("height", "200px");
    });
}

/**
 * Load Certifications
 */
function loadCertifications(file, id, title) {
    const section = d3.select(id);
    setHeading(section, title);
    d3.json(file).then(data => {
        // Workaround to center content vertically
        section.append("div").attr("class", "hidden-sm hidden-xs").style("height", "100px");

        const certifications = section.append("div")
            .attr("class", "container-fluid align-middle")
            .append("div").attr("class", "row")
            .selectAll("div")
            .data(data)
            .enter()
            .append("div")
            .attr("class", "col-lg-4 col-md-6 text-center")
            .append("div")
            .attr("class", "service-box mt-5 mx-auto");

        certifications
            .append("a").attr("href", c => c.link).attr("target", "_blank")
            .append("img").style("height", "200px").attr("src", c => c.badge);

        certifications.append("div").append("h4")
            .append("a").attr("target", "_blank").attr("href", c => c.link)
            .text(c => c.title);

        certifications.append("h5").attr("class", "text-muted")
            // .append("a").attr("target", "_blank").attr("href", c => c.organization.url)
            .text(c => c.organization.name);

        certifications.append("p")
            .attr("class", "text-muted")
            .text(c => c.date);
        section.append("div")
            .attr("class", "hidden-sm hidden-xs")
            .style("height", "200px");
    });
}


/**
 * Load Experience
 */
function loadExperience(file, id, title) {
    const section = d3.select(id);
    setHeading(section, title);

    d3.json(file).then(json => {
        const t = section.append("div").attr("class", "cd-horizontal-timeline");

        const timeline = t.append("div").attr("class", "timeline");

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
            .attr("class", d => d.selected ? "selected" : "")
            .attr("data-date", d => d.date)
            .text(d => d.time);

        events.append("span").attr("class", "filling-line").attr("aria-hidden", "true");

        timeline.append("ul")
            .attr("class", "cd-timeline-navigation")
            .selectAll("li")
            .data([{"text": "Prev", "class": "prev inactive"}, {"text": "Next", "class": "next"}])
            .enter()
            .append("li")
            .append("a")
            .attr("href", "#0")
            .attr("class", d => d.class)
            .text(d => d.text);

        const li = t.append("div")
            .attr("class", "events-content")
            .append("ol")
            .selectAll("li")
            .data(json.positions)
            .enter()
            .append("li")
            .attr("class", d => d.selected ? "selected" : "")
            .attr("data-date", d => d.date);

        li.append("h3").text(d => d.position);

        li.append("h4")
            .attr("class", "py-1")
            .append("a")
            .attr("target", "_blank")
            .attr("href", d => d.organization.url)
            .text(d => d.organization.name);

        li.append("h5").attr("class", "text-muted font-italic py-1").text(d => d.duration);

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
            .attr("href", d => d.ref);

        a.append("img").attr("class", "img-fluid").attr("src", d => d.img);

        a.append("div")
            .attr("class", "portfolio-box-caption")
            .append("div")
            .attr("class", "portfolio-box-caption-content")
            .append("div")
            .attr("class", "project-name")
            .text(d => d.text);
    });
}

/**
 * Load Skills
 */
function loadSkills(file, id, title) {
    const section = d3.select(id);
    setHeading(section, title);

    d3.json(file).then(data => {
        const skill = section.append("div")
            .attr("class", "container-fluid")
            .append("svg")
            .attr("viewBox", "0 0 600 280")
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("data-toggle", "modal")
            .attr("data-target", d => "#" + (d.id ? d.id : d.label))
            .attr("transform", d => "translate(" + d.x + "," + (15 + d.y) + ")")
            .on("mouseover", () => {
                const g = d3.select(this).each(() => {
                    /* Bring to front (based on gist.github.com/trtg/3922684) */
                    this.parentNode.appendChild(this);
                });
                g.select("circle").attr("fill-opacity", 1).attr("r", d => d.size * 1.3);
                g.select("text").attr("font-size", d => d.size * 0.5)
            })
            .on("mouseout", () => {
                const g = d3.select(this);
                g.select("circle").attr("fill-opacity", 0.85).attr("r", d => d.size);
                g.select("text").attr("font-size", d => d.size * 0.35)
            });

        skill.append("circle")
            .attr("r", d => d.size)
            .attr("fill-opacity", 0.85)
            .attr("fill", d => "#" + d.color);

        skill.append("text")
            .style("fill", "white")
            .attr("text-anchor", "middle")
            .attr("dy", "0.3em")
            .attr("font-size", d => d.size * 0.35)
            .text(d => d.label);

        const modal = section.data(data)
            .enter()
            .append("div")
            .attr("id", d => d.id ? d.id : d.label)
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
            .text(d => d.label + " - Sample Projects");

        modal.append("div")
            .attr("class", "modal-body")
            .selectAll("p")
            .data(d => d.projects)
            .enter()
            .append("p")
            .attr("class", "text-center")
            .append("a")
            .attr("class", "btn btn-default")
            .attr("target", "_blank")
            .attr("href", d => d.link)
            .text(d => d.name);
    });
}