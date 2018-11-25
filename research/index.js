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

/** Load Research Projects
 *
 * @param file JSON file to read data from
 * @param id Target section ID
 * @param title to be used for the section heading
 */
function loadResearchProjects(file, id, title) {
    d3.json(file, function (json) {
        const section = d3.select(id);

        setHeading(section, title);

        const media = section.append("div")
            .attr("class", "container")
            .selectAll("div")
            .data(json.items)
            .enter()
            .append("div")
            .attr("class", "row");

        const header = media.append("div").attr("class", "col-lg-10");

        header.append("h3")
            .text(function (d) {
                return d.project;
            });

        header.append("h4")
            .text(function (d) {
                return d.position;
            });

        header.append("a")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.organization.url;
            })
            .append("h4")
            .text(function (d) {
                return d.organization.name;
            });

        header.append("p")
            .attr("class", "text-muted")
            .text(function (d) {
                return d.duration;
            });

        const tags = header.append("p");

        tags.append("span")
            .attr("class", "list-inline mr-2")
            .selectAll("li")
            .data(function (d) {
                return d.interests;
            })
            .enter()
            .append("li")
            .attr("class", "list-inline-item")
            .append("span")
            .attr("class", "badge badge-warning p-2")
            .text(function (d) {
                return d;
            });

        tags.append("span")
            .attr("class", "list-inline")
            .selectAll("li")
            .data(function (d) {
                return d.skills;
            })
            .enter()
            .append("li")
            .attr("class", "list-inline-item")
            .append("span")
            .attr("class", "badge badge-primary p-2")
            .text(function (d) {
                return d;
            });

        header.append("div")
            .selectAll("a")
            .data(function (d) {
                return d.products;
            })
            .enter()
            .append("a")
            .attr("class", "github-button")
            .attr("href", function (d) {
                return d.url;
            })
            .attr("data-size", "large")
            .attr("aria-label", function (d) {
                return d.name + " on Github"
            })
            .text(function (d) {
                return d.name;
            });

        header.append("a")
            .attr("class", "btn btn-link")
            .attr("data-toggle", "collapse")
            .attr("data-target", function (d) {
                return "#" + d.id;
            })
            .text("+ Details");

        header.append("div")
            .attr("class", "row")
            .attr("id", function (d) {
                return d.id;
            })
            .attr("class", "collapse out")
            .append("p")
            .attr("class", "text-justify")
            .append("em")
            .append("ul")
            .attr("class", "list list-default")
            .selectAll("li")
            .data(function (d) {
                return d.tasks;
            })
            .enter()
            .append("li")
            .text(function (d) {
                return d;
            });

        const sponsors = media.append("div").attr("class", "col-lg-2 media-middle");

        sponsors.append("h6")
            .attr("class", "text-muted")
            .text("Sponsor");

        sponsors.selectAll("a")
            .data(function (d) {
                return d.sponsors;
            })
            .enter()
            .append("a")
            .attr("href", function (d) {
                return d.url;
            })
            .attr("title", function (d) {
                return d.name;
            })
            .attr("alt", function (d) {
                return d.name;
            })
            .attr("target", "_blank")
            .attr("style", "margin-right: 5px;")
            .append("img")
            .attr("src", function (d) {
                return d.logo;
            })
            .attr("style", "width: 100px;height:50px;");
    });
}

/** Load Publications
 *
 * @param file JSON file to read data from
 * @param id Target section ID
 * @param title to be used for the section heading
 */
function loadPublications(file, id, title) {
    d3.json(file, function (json) {
        const section = d3.select(id);

        setHeading(section, title);

        const publication = section.append("div")
            .attr("class", "container")
            .selectAll("div")
            .data(json.publications)
            .enter()
            .append("div")
            .attr("class", "row")
            .append("div")
            .attr("class", "col-lg-12")
            .attr("data-role", "page");

        publication.append("h3")
            .append("a")
            .attr("href", function (d) {
                return d.doi ? "https://dx.doi.org/" + d.doi : "";
            })
            .attr("target", "_blank")
            .text(function (d) {
                return d.title;
            });

        publication.append("h4")
            .text(function (p) {
                return authorList(p, ", ")
            });

        publication.append("p")
            .attr("class", "text-muted")
            .text(function (p) {
                return p.venue + ", " + p.year;
            });

        // publication.append("p")
        //     .style("display", function (d) {
        //         return d.doi == null ? "none" : null;
        //     })
        //     .text("DOI: ")
        //     .append("a")
        //     .attr("href", function (d) {
        //         return d.url;
        //     })
        //     .attr("target", "_blank")
        //     .text(function (d) {
        //         return d.doi;
        //     });

        publication.append("button")
            .attr("class", "btn btn-link")
            .attr("data-container", "body")
            .attr("data-toggle", "popover")
            .attr("data-placement", "top")
            .attr("data-content", function (p) {
                const author = p.authors[0];
                const title = p.title;
                const key = author.slice(author.lastIndexOf(" ") + 1) + p.year + title.slice(0, title.indexOf(" ", 1));
                return `@${p.type}{${key},
                    title = {${title}},
                    author = {${authorList(p, " and ")}},
                    ${(p.type === "article") ? "journal" : "booktitle"} = {${p.venue}},
                    ${(p.pages == null) ? "" : "pages = {" + p.pages + "},"}
                    year = {${p.year}}}`;
            })
            .append("span")
            .attr("class", "fas fa-quote-left")
            .attr("aria-hidden", "true")
            .text(" Cite") && $("[data-toggle=popover]").popover();

        publication.append("a")
            .attr("class", "btn btn-link")
            .attr("role", "button")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.fulltext;
            })
            .style("display", function (d) {
                return d.fulltext == null ? "none" : null;
            })
            .append("span")
            .attr("class", "fas fa-file-pdf")
            .attr("aria-hidden", "true")
            .text(" Read");

        publication.append("a")
            .attr("class", "btn btn-link")
            .attr("role", "button")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.presentation;
            })
            .style("display", function (d) {
                return d.presentation == null ? "none" : null;
            })
            .append("span")
            .attr("class", "fab fa-slideshare")
            .attr("aria-hidden", "true")
            .text(" Presentation");

        publication.append("a")
            .attr("class", "btn btn-link")
            .attr("role", "button")
            .attr("target", "_blank")
            .attr("href", function (d) {
                const title = d.short_title ? d.short_title : d.title;
                const url = d.fulltext ? d.fulltext : "https://dx.doi.org/" + d.doi;
                return "https://twitter.com/intent/tweet?text=" + title + "&url=" + url + "&via=amr_abed";
            })
            .append("span")
            .attr("class", "fas fa-share-square")
            .attr("aria-hidden", "true")
            .text(" Share")
            .style("display", function (d) {
                return d.fulltext || d.doi ? null : "none";
            });

        const impact = publication;//.append("div");

        impact.append("span")
            .attr("data-badge-popover", "top")
            .attr("data-badge-type", "3")
            .attr("data-hide-no-mentions", "true")
            .attr("data-role", "page")
            .attr("class", "altmetric-embed")
            .attr("data-doi", function (d) {
                return d.doi;
            });

        impact.append("span")
            .style("padding-left", "10px")
            .style("display", "inline")
            .attr("class", "__dimensions_badge_embed__")
            .attr("data-hide-zero-citations", "true")
            .attr("data-style", "small_rectangle")
            .attr("data-doi", function (d) {
                return d.doi;
            });
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
