populateNavbar(["education", "skills", "languages", "technical", "research", "teaching", "volunteer", "awards", "publications"]);
populateIcons();

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
    }).append("span").attr("class", a => a.icon).text(a => " " + a.text);
}