<div>
    <nav id="pageNav" class="navbar-inverse">
        <div class="container text-center">
            <div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="/">Amr Abed</a>
                    </li>
                    <li>
                        <a href="/engineering">Engineering</a>
                    </li>
                    <li>
                        <a href="/research">Research</a>
                    </li>
                    <li>
                        <a href="/teaching">Teaching</a>
                    </li>
                    <li>
                        <a href="/resume">Résumé</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/blog">Blog</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <footer class="panel-footer text-center">
        Created by <a href="/">Amr Abed</a> using <a href="https://d3js.org" target="_blank">D3.js</a> |
        Theme: <a href="https://startbootstrap.com/template-overviews/creative" target="_blank">Creative</a>
        by <a href="https://startbootstrap.com/" target="_blank">Start Bootstrap</a> |
        Photos: <a href="http://unsplash.com" target="_blank">unsplash.com</a> |
        Website code is available on
        <a href="https://www.github.com/amrabed/amrabed.github.io" target="_blank">Github</a>
        under the <a href="https://opensource.org/licenses/MIT" target="_blank">MIT license</a>
    </footer>
</div>

<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
<script src="https://unpkg.com/scrollreveal@3.3.2/dist/scrollreveal.min.js"></script>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="/assets/js/creative.min.js"></script>
<script src="/assets/js/amrabed.min.js"></script>
<script src="/assets/js/analytics.min.js"></script>

<script>
    const path = window.location.pathname;
    $('.nav > li > a[href="' + path.substring(0, path.lastIndexOf("/")) + '"]').parent().addClass('active');
</script>