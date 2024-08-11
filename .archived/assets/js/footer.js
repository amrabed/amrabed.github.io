// Activate current page in bottom navbar
const path = window.location.pathname;
const current = path.substring(path.indexOf("/"), path.indexOf("/", 2));
$('.nav > li > a[href="' + (current ? current : "/") + '"]').parent().addClass('active');
// Show and hide back-to-top arrow on scroll
$(document).scroll(function () {
    if ($(this).scrollTop() > 800) $("#back2top").fadeIn(); else $("#back2top").fadeOut();
});