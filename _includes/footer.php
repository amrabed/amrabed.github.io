<a id="back2top" class="js-scroll-trigger" href="#page-top" title="Back to top">
    <span class="fas fa-arrow-up fa-lg"></span>
</a>

<div>
    <nav id="pageNav" class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container">
            <ul class="nav navbar-nav mx-auto text-center">
                <li class="nav-item mx-2">
                    <a class="nav-link text-faded" href="/">Amr Abed</a>
                </li>
                <li class="nav-item mx-2">
                    <a class="nav-link text-faded" href="/engineering">Engineering</a>
                </li>
                <li class="nav-item mx-2">
                    <a class="nav-link text-faded" href="/research">Research</a>
                </li>
                <li class="nav-item mx-2">
                    <a class="nav-link text-faded" href="/teaching">Teaching</a>
                </li>
                <li class="nav-item mx-2">
                    <a class="nav-link text-faded" href="/resume">Résumé</a>
                </li>
                <li class="nav-item mx-2">
                    <a class="nav-link text-faded" href="/about">About</a>
                </li>
                <li class="nav-item mx-2">
                    <a class="nav-link text-faded" href="/blog">Blog</a>
                </li>
            </ul>
        </div>
    </nav>
    <footer id="footer" class="p-2 panel-footer text-center">
        Created by <a href="/">Amr Abed</a> using <a href="https://d3js.org" target="_blank">D3.js</a> |
        Theme: <a href="https://startbootstrap.com/template-overviews/creative" target="_blank">Creative</a>
        by <a href="https://startbootstrap.com/" target="_blank">Start Bootstrap</a> |
        Photos: <a href="http://unsplash.com" target="_blank">unsplash.com</a> |
        Website code is available on
        <a href="https://www.github.com/amrabed/amrabed.github.io" target="_blank">Github</a>
        under the <a href="https://opensource.org/licenses/MIT" target="_blank">MIT license</a>
    </footer>
</div>

<script src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
        integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
        integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
        crossorigin="anonymous"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
<script src="https://unpkg.com/scrollreveal@4.0.1/dist/scrollreveal.min.js"></script>
<script src="https://d3js.org/d3.v5.min.js"></script>
<script src="/assets/js/amrabed.min.js"></script>
<script src="index.js"></script>
<script src="/assets/js/creative.min.js"></script>

<script>
    // Activate current page in bottom navbar
    const path = window.location.pathname;
    $('.nav > li > a[href="' + path.substring(0, path.lastIndexOf("/")) + '"]').parent().addClass('active');
    // Show and hide back-to-top arrow on scroll
    $(document).scroll(function () {
        if ($(this).scrollTop() > 800) $("#back2top").fadeIn(); else $("#back2top").fadeOut();
    });
</script>