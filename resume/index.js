populateNavbar(["education", "skills", "languages", "technical", "research", "teaching", "volunteer", "awards", "publications"]);
populateIcons();

// loadPublications("../research/publications.json", "#publications");

function populateIcons() {
    const list = [
        {
            title: "Email me",
            text: "Contact",
            url: "mailto:amraabed@gmail.com",
            icon: "fas fa-envelope"
        },
        {
            title: "Download as PDF",
            text: "PDF",
            url: "https://github.com/amrabed/resume/releases/download/v1.0/AmrAbed.pdf",
            icon: "fas fa-file-pdf"
        }];
    d3.select("#navbarResponsive")
        .append("ul").attr("class", "navbar-nav")
        .selectAll("li")
        .data(list)
        .enter()
        .append("li")
        .attr("class", "nav-item")
        .append("a")
        .attr("class", "nav-link")
        .attr("target", "_blank")
        .attr("href", function (a) {
            return a.url;
        }).attr("title", function (a) {
        return a.title;
    }).append("span").attr("class", function (a) {
        return a.icon;
    }).text(function (a) {
        return " " + a.text;
    });
}

/** Load Publications
 *
 * @param file JSON file to read data from
 * @param id Target section ID
 */
function loadPublications(file, id) {
    d3.json("../research/publications.json").then(function (json) {
        d3.select("#publications")
            .selectAll("p")
            .data(json.publications)
            .enter()
            .append("p")
            .text(function (p) {
                return `${authorList(p, ", ")}.
                    "<strong>${p.title}</strong>,"
                    in ${p.venue}, ${p.year}`;
            });
    });
}
