/**
 * Created by AmrAbed on 10/22/16.
 */

$.when($.getScript("include.js"), $.getScript("style/js/timeline.js")).done(function () {
    populateNavbar();
    loadEducation("education.json", "#education", "Education");
    loadExperience("experience.json", "#experience", "Experience");
    loadSkills("skills.json", "#skills", "Technical Skills");
    loadFooter("footer.html")
});