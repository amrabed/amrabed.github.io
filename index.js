/**
 * Created by AmrAbed on 10/22/16.
 */

$.when($.getScript("include.js"), $.getScript("style/js/timeline.js")).done(function () {
    populateNavbar();
    loadEducation();
    loadExperience();
    loadSkills();
    loadFooter("footer.html")
});