/**
 * Created by AmrAbed on 10/22/16
 */
populateNavbar(["bio", "projects", "publications"], ["Email", "LinkedIn", "GitHub", "Google Scholar", "Mendeley", "SlideShare", "Twitter"]);
loadResearchProjects("projects.json", "#projects", "Research Projects");
loadPublications("publications.json", "#publications", "Publications");
loadFooter();
$.getScript("https://buttons.github.io/buttons.js");// Show Github buttons
$.getScript("https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js");// show Altmetric badges

/** Load Research Projects
 *
 * @param file JSON file to read data from
 * @param id Target section ID
 * @param title to be used for the section heading
 */
function loadResearchProjects(file, id, title) {
    d3.json(file, function (json) {
        var section = d3.select(id);

        setHeading(section, title);

        var media = section.append("div")
            .attr("class", "container")
            .selectAll("div")
            .data(json.items)
            .enter()
            .append("div")
            .attr("class", "row");

        var header = getContainer(media, "col-lg-10");

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

        var tags = header.append("p");

        tags.append("i")
            .attr("class", "list-inline")
            .selectAll("li")
            .data(function (d) {
                return d.interests;
            })
            .enter()
            .append("li")
            .append("label")
            .attr("class", "label label-warning")
            .attr("style", "margin-right: -5px")
            .text(function (d) {
                return d;
            });

        tags.append("i")
            .style("margin-left", "0px")
            .attr("class", "list-inline")
            .selectAll("li")
            .data(function (d) {
                return d.skills;
            })
            .enter()
            .append("li")
            .append("label")
            .attr("class", "label label-info")
            .attr("style", "margin-right: -5px")
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

        var details = getContainer(header, "row")
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

        var sponsors = getContainer(media, "col-lg-2 media-middle");

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
        var section = d3.select(id);

        setHeading(section, title);

        var publication = section.append("div")
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
            .text(function (d) {
                return d.authors;
            });

        publication.append("p")
            .attr("class", "text-muted")
            .text(function (d) {
                return d.venue;
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
            .attr("class", "btn btn-default btn-square")
            .attr("data-container", "body")
            .attr("data-toggle", "popover")
            .attr("data-placement", "top")
            .attr("data-content", function (d) {
                return d.citation;
            })
            .append("i")
            .attr("class", "fa fa-quote-left")
            .attr("aria-hidden", "true")
            .text(" Citation") && $("[data-toggle=popover]").popover();

        publication.append("a")
            .attr("class", "btn btn-default btn-square")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.fulltext;
            })
            .style("display", function (d) {
                return d.fulltext == null ? "none" : null;
            })
            .append("i")
            .attr("class", "fa fa-download")
            .attr("aria-hidden", "true")
            .text(" Full Text");

        publication.append("a")
            .attr("class", "btn btn-default btn-square")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.presentation;
            })
            .style("display", function (d) {
                return d.presentation == null ? "none" : null;
            })
            .append("i")
            .attr("class", "fa fa-slideshare")
            .attr("aria-hidden", "true")
            .text(" Presentation");

        publication.append("a")
            .attr("class", "btn btn-default btn-square")
            .attr("target", "_blank")
            .attr("href", function (d) {
                var title = d.short_title ? d.short_title : d.title;
                var url = d.fulltext ? d.fulltext : "https://dx.doi.org/" + d.doi;
                return "https://twitter.com/intent/tweet?text=" + title + "&url=" + url + "&via=amr_abed";
            })
            .append("i")
            .attr("class", "fa fa-share-square-o")
            .attr("aria-hidden", "true")
            .text(" Share")
            // .append("img")
            // .attr("src", "../assets/img/tweet.png")
            // .attr("title", "Share")
            // .attr("alt", "Share")
            // .style("height", "30px")
            // .style("padding-right", "5px")
            .style("display", function (d) {
                return d.fulltext || d.doi ? null : "none";
            });

        var impact = publication;//.append("div");


        impact.append("span")
            .style("padding-right", "5px")
            .attr("data-badge-popover", "top")
            .attr("data-badge-type", "1")
            .attr("data-hide-no-mentions", "true")
            .attr("data-role", "page")
            .attr("class", "altmetric-embed")
            .attr("data-doi", function (d) {
                return d.doi;
            });

        impact.append("a")
            .attr("target", "_blank")
            .attr("display", function (d) {
                return d.doi ? null : "none";
            })
            .attr("href", function (d) {
                return d.scopus;
            })
            .append("img")
            .attr("src", function (d) {
                if (d.doi != null) {
                    return "https://api.elsevier.com/content/abstract/citation-count?doi=" +
                        d.doi + "&httpAccept=image/jpeg&apiKey=ed9196839729f61e0e1ab9cd1ff9f56b";
                }
            });
    });
}
