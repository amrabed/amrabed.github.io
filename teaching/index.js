/**
 * Created by AmrAbed on 10/22/16.
 */

$.getScript("../include.js", function () {
    populateNavbar();
    loadCourses("courses.json", "#courses", "Courses");
    loadFooter("../footer.html");
});