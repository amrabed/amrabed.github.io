/**
 * Created by AmrAbed on 10/22/16.
 */
function populateNavbar() {
    d3.json("navbar.json", function (json) {
        //     var div = d3.select("#mainNav")
        //         .append("div")
        //         .attr("class", "container-fluid");
        //
        //     var header = div.append("div")
        //         .attr("class", "navbar-header");
        //
        //     var toggle = header.append("button")
        //         .attr("type", "button")
        //         .attr("class", "navbar-toggle collapsed")
        //         .attr("data-toggle", "collapse")
        //         .attr("data-target", "#menu-items");
        //
        //     toggle.append("span")
        //         .attr("class", "sr-only")
        //         .text("Toggle navigation");
        //
        //     toggle.append("i")
        //         .attr("class", "fa fa-bars");
        //
        //     header.selectAll("a")
        //         .data(json.header)
        //         .enter()
        //         .append("a")
        //         .attr("class", "navbar-brand page-scroll")
        //         .attr("href", function (d) {
        //             return d.url;
        //         }).text(function (d) {
        //         return d.title;
        //     });
        //
        //     var menu = div.append("div")
        //         .attr("class", "collapse navbar-collapse")
        //         .attr("id", "menu-items");
        //
        // menu.append("ul")
        //     .attr("class", "nav navbar-nav navbar-left")
        //     .selectAll("li")
        //     .data(json.left)
        //     .enter()
        //     .append("li")
        //     .append("a")
        //     .attr("class", "page-scroll")
        //     .attr("href", function (d) {
        //         return d.ref;
        //     })
        //     .text(function (d) {
        //         return d.title;
        //     });

        var menu = d3.select("#menu-items");
        menu.append("div")
            .attr("class", "nav navbar-nav navbar-right")
            .attr("style", "margin: 10px 5px")
            .selectAll("a")
            .data(json.right)
            .enter()
            .append("a")
            .attr("class", "image-link")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.url;
            })
            .append("img")
            .attr("class", "image-circle")
            .attr("style", "width:24px;margin-right:4px;")
            .attr("title", function (d) {
                return d.name;
            })
            .attr("alt", function (d) {
                return d.name;
            })
            .attr("src", function (d) {
                return d.icon;
            });
    });
}

function setHeading(section, title) {
    var heading = section.append("div")
        .attr("class", "container-fluid")
        .append("div")
        .attr("class", "row text-center");

    heading.append("h2")
        .attr("class", "section-heading")
        .text(title);

    heading.append("hr")
        .attr("class", "primary");
}

function getContainer(parent, type) {
    return parent.append("div").attr("class", type);
}


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
            .attr("data-style", "mega")
            .attr("aria-label", function (d) {
                return d.name + " on Github"
            })
            .text(function (d) {
                return d.name;
            }) && show_buttons();

        // $.getScript("style/js/github-button.js", function () {
        //     show_buttons();
        // });
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
            .attr("class", "col-lg-12");

        publication.append("h3")
            .append("a")
            .attr("href", function (d) {
                return d.url;
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

        publication.append("a")
            .attr("target", "_blank")
            .attr("href", function (d) {
                var title = d.short_title ? d.short_title : d.title;
                return "https://twitter.com/intent/tweet?text=" + title + "&url=" + d.fulltext + "&via=amr_abed";
            })
            .append("img")
            .attr("src", "../style/img/tweet.png")
            .attr("alt", "Share")
            .style("height", "30px")
            .style("padding-right", "5px")
            .style("display", function (d) {
                return d.fulltext == null ? "none" : null;
            });

        publication.append("span")
            .attr("data-badge-popover", "top")
            .attr("data-badge-type", "1")
            .attr("data-hide-no-mentions", "true")
            .attr("class", "altmetric-embed")
            .attr("data-doi", function (d) {
                return d.doi;
            });

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
    });

    _altmetric_embed_init();
}

/** Load Enginineering Positions
 *
 * @param file JSON file to read data from
 * @param id Target section ID
 * @param title Target section title
 */
function loadEngineeringPositions(file, id, title) {
    d3.json(file, function (json) {
        var positions = d3.select(id);

        setHeading(positions, title);

        var media = getContainer(positions, "container")
            .selectAll("div")
            .data(json.positions)
            .enter()
            .append("div")
            .attr("class", "row");

        var project = getContainer(media, "col-lg-10");

        project.append("h3")
            .text(function (d) {
                return d.position;
            });

        project.append("a")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.project.url;
            })
            .append("h4")
            .text(function (d) {
                return d.project.name;
            });

        project.append("p")
            .attr("class", "text-muted")
            .text(function (d) {
                return d.duration;
            });

        project.append("a")
            .attr("class", "btn btn-link")
            .attr("data-toggle", "collapse")
            .attr("data-target", function (d) {
                return "#" + d.id;
            })
            .text("+ Details");

        getContainer(project, "row")
            .attr("id", function (d) {
                return d.id;
            })
            .attr("class", "collapse out")
            .append("p")
            .append("em")
            .append("ul")
            .attr("class", "list list-default")
            .selectAll("li")
            .data(function (d) {
                return d.tasks;
            })
            .enter()
            .append("li")
            .attr("class", "text-justify")
            .text(function (d) {
                return d;
            });

        project.append("p")
            .attr("class", "list-inline")
            .selectAll("li")
            .data(function (d) {
                return d.skills;
            })
            .enter()
            .append("li")
            .append("label")
            .attr("class", "label label-info")
            .style("margin-right", "-5px")
            .text(function (d) {
                return d;
            });

        var organization = getContainer(media, "col-lg-2");

        organization.selectAll("a")
            .data(function (d) {
                return d.organization;
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
            .append("img")
            .attr("src", function (d) {
                return d.logo;
            })
            .style("width: 128px;");
    });
}

/** Load Products
 *
 * @param file JSON file to read data from
 * @param id Target section ID
 * @param title Target section title
 */
function loadProducts(file, id, title) {
    d3.json(file, function (json) {
        var products = d3.select(id);

        setHeading(products, title);

        var product = products.append("div")
            .attr("class", "container")
            .selectAll("div")
            .data(json.products)
            .enter()
            .append("div")
            .attr("class", "row")
            .append("div")
            .attr("class", "col-lg-12");

        var header = product.append("h3");

        header.append("a").append("em")
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.url;
            })
            .text(function (d) {
                return d.name;
            });

        // product.append("p")
        //     .attr("class", "text-muted")
        //     .text(function (d) {
        //         return d.release;
        //     });
        header.append("a")
            .style("display", function (d) {
                return d.playstore ? null : "none";
            })
            .attr("target", "_blank")
            .attr("href", function (d) {
                return d.playstore;
            })
            .append("img")
            .style("width", "150px")
            .attr("alt", "Get in on Google Play")
            .attr("src", "../style/img/google-play-badge.png");

        product.append("p")
            .attr("class", "text-justify")
            .text(function (d) {
                return d.description;
            });

        product.append("div")
            .append("a")
            .attr("class", "github-button")
            .attr("href", function (d) {
                return d.url;
            })
            .attr("data-style", "mega")
            .attr("aria-label", function (d) {
                return d.name + " on Github"
            })
            .text(function (d) {
                return d.name;
            }) && show_buttons();

        product.append("p")
            .attr("class", "list-inline")
            .selectAll("li")
            .data(function (d) {
                return d.skills;
            })
            .enter()
            .append("li")
            .append("label")
            .attr("class", "label label-info")
            .style("margin-right", "-5px")
            .text(function (d) {
                return d;
            });
    });
}