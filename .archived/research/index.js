/**
 * Created by AmrAbed on 10/22/16
 */
populateNavbar(["bio", "projects", "publications"], ["Email", "LinkedIn", "GitHub", "Google Scholar", "Mendeley", "SlideShare", "Twitter"]);
loadResearchProjects("projects.json", "#projects", "Research Projects");
loadPublications("publications.json", "#publications", "Publications");
loadPrezi();

$.getScript("https://buttons.github.io/buttons.js");// Show Github buttons
$.getScript("https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js");// show Altmetric badges
$.getScript("https://badge.dimensions.ai/badge.js");// Show Dimensions badge

/**
 * Load Research Projects
 */
function loadResearchProjects(file, id, title) {
    const section = d3.select(id);
    setHeading(section, title);

    d3.json(file).then(data => {
        const media = section.append("div")
            .attr("class", "container")
            .selectAll("div")
            .data(data)
            .enter()
            .append("div")
            .attr("class", "row mb-4");

        const header = media.append("div").attr("class", "col-lg-10");

        header.append("h4").text(d => d.project);
        header.append("h5").text(d => d.position);

        header.append("a")
            .attr("target", "_blank")
            .attr("href", d => d.organization.url)
            .append("h5")
            .text(d => d.organization.name);

        header.append("p")
            .attr("class", "text-muted")
            .text(d => d.duration);

        const tags = header.append("p");

        tags.append("span")
            .attr("class", "list-inline p-2")
            .selectAll("li")
            .data(d => d.interests)
            .enter()
            .append("li")
            .attr("class", "list-inline-item")
            .append("span")
            .attr("class", "badge text-bg-dark p-2")
            .text(d => d);

        tags.append("span")
            .attr("class", "list-inline")
            .selectAll("li")
            .data(d => d.skills)
            .enter()
            .append("li")
            .attr("class", "list-inline-item")
            .append("span")
            .attr("class", "badge text-bg-primary p-2")
            .text(d => d);

        header.append("div")
            .selectAll("a")
            .data(d => d.products)
            .enter()
            .append("a")
            .attr("class", "github-button")
            .attr("href", d => d.url)
            .attr("data-bs-size", "large")
            .attr("aria-label", d => d.name + " on Github")
            .text(d => d.name);

        const chevron = header.append("a")
            .attr("class", "btn btn-link")
            .attr("aria-expanded", "false")
            .attr("data-bs-toggle", "collapse")
            .attr("data-bs-target", d => "#" + d.id);

        chevron.append("span")
            .attr("class", "fas fa-chevron-right");
        chevron.append("span")
            .attr("class", "fas fa-chevron-down");
        chevron.append("span").attr("class", "pl-2").text(" Details");

        header.append("div")
            .attr("class", "row")
            .attr("id", d => d.id)
            .attr("class", "collapse out")
            .append("p")
            .attr("class", "text-justify")
            .append("em")
            .append("ul")
            .attr("class", "list")
            .selectAll("li")
            .data(d => d.tasks)
            .enter()
            .append("li")
            .text(d => d);

        const sponsors = media.append("div").attr("class", "col-lg-2 media-middle");

        sponsors.append("h6")
            .attr("class", "text-muted")
            .text("Sponsor");

        sponsors.selectAll("a")
            .data(d => d.sponsors)
            .enter()
            .append("a")
            .attr("href", d => d.url)
            .attr("title", d => d.name)
            .attr("alt", d => d.name)
            .attr("target", "_blank")
            .attr("style", "margin-right: 5px;")
            .append("img")
            .attr("src", d => d.logo)
            .attr("style", "width: 100px;height:50px;");
    });
}

/**
 * Load Publications
 */
function loadPublications(file, id, title) {
    const section = d3.select(id);
    setHeading(section, title);

    d3.json(file).then(data => {
        const publication = section.append("div")
            .attr("class", "container")
            .selectAll("div")
            .data(data)
            .enter()
            .append("div")
            .attr("class", "row")
            .append("div")
            .attr("class", "col-lg-12")
            .attr("data-bs-role", "page");

        publication.append("h4")
            .append("a")
            .attr("href", p => p.doi ? "https://dx.doi.org/" + p.doi : "")
            .attr("target", "_blank")
            .text(p => p.title);

        publication.append("h5").text(p => p.authors.join(", "));
        publication.append("p").attr("class", "text-muted").text(p => p.venue + ", " + p.year);

        publication.append("button")
            .attr("class", "btn btn-link")
            .attr("data-bs-container", "body")
            .attr("data-bs-toggle", "popover")
            .attr("data-bs-placement", "top")
            .attr("data-bs-content", p => {
                const author = p.authors[0];
                const paperTitle = p.title;
                const key = author.slice(author.lastIndexOf(" ") + 1) + p.year + paperTitle.slice(0, paperTitle.indexOf(" ", 1));
                return `@${p.type}{${key},
                    title = {${paperTitle}},
                    author = {${p.authors.join(" and ")}},
                    ${(p.type === "article") ? "journal" : "booktitle"} = {${p.venue}},
                    ${(p.pages == null) ? "" : "pages = {" + p.pages + "},"}
                    year = {${p.year}}}`;
            })
            .append("span")
            .attr("class", "fas fa-quote-left")
            .attr("aria-hidden", "true")
            .text(" Cite") && $("[data-bs-toggle=popover]").popover();

        publication.append("a")
            .attr("class", "btn btn-link")
            .attr("role", "button")
            .attr("target", "_blank")
            .attr("href", p => p.fulltext)
            .style("display", p => p.fulltext ? null : "none")
            .append("span")
            .attr("class", "fas fa-file-pdf")
            .attr("aria-hidden", "true")
            .text(" Read");

        publication.append("a")
            .attr("class", "btn btn-link")
            .attr("role", "button")
            .attr("target", "_blank")
            .attr("href", p => p.presentation)
            .style("display", p => p.presentation ? null : "none")
            .append("span")
            .attr("class", "fab fa-slideshare")
            .attr("aria-hidden", "true")
            .text(" Presentation");

        publication.append("a")
            .attr("class", "btn btn-link")
            .attr("role", "button")
            .attr("target", "_blank")
            .attr("href", p => {
                const paperTitle = p.short_title ? p.short_title : p.title;
                const url = p.fulltext ? p.fulltext : "https://dx.doi.org/" + p.doi;
                return "https://twitter.com/intent/tweet?text=" + paperTitle + "&url=" + url + "&via=amr_abed";
            })
            .append("span")
            .attr("class", "fas fa-share-square")
            .attr("aria-hidden", "true")
            .text(" Share")
            .style("display", p => p.fulltext || p.doi ? null : "none");

        publication.append("span")
            .attr("data-bs-badge-popover", "top")
            .attr("data-bs-badge-type", "3")
            .attr("data-bs-hide-no-mentions", "true")
            .attr("data-bs-role", "page")
            .attr("class", "altmetric-embed")
            .attr("data-bs-doi", p => p.doi);

        publication.append("span")
            .style("padding-left", "10px")
            .style("display", "inline")
            .attr("class", "__dimensions_badge_embed__")
            .attr("data-bs-hide-zero-citations", "true")
            .attr("data-bs-style", "small_rectangle")
            .attr("data-bs-doi", p => p.doi);
    });
}

function loadPrezi() {
    d3.select("#bio").append("div")
        .attr("id", "prezi")
        .attr("class", "container text-center")
        .append("iframe")
        .attr("allowfullscreen", "")
        .attr("width", "960")
        .attr("height", "574")
        .attr("frameborder", "0")
        .attr("marginwidth", "0")
        .attr("marginheight", "0")
        .attr("scrolling", "no")
        .attr("style", "border:0 none; max-width: 100%; margin-top: 10px;")
        .attr("src", "https://prezi.com/embed/pdcyfmyhcup9/?bgcolor=ffffff&lock_to_path=1&autoplay=1&autohide_ctrls=0&landing_data=bHVZZmNaNDBIWnNjdEVENDRhZDFNZGNIUE43MHdLNWpsdFJLb2ZHanI0VTc1Y2lkdkdrT2V0UzgzWFFBYk5sa1R3PT0&amp;landing_sign=PJF_DAy5_3Jg9mPLEto5Ld4ASoECO0hUheFwIujSR38");
}
