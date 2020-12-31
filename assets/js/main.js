const nav = document.getElementsByTagName('nav')[0];
const main = document.getElementsByTagName("main")[0];
const sidebar = document.getElementsByClassName('sidebar')[0];
const scrollBtn = document.getElementById('scroll-up');
var imgs = main.getElementsByTagName("img");
var h6s = main.getElementsByTagName("h6");
var h5s = main.getElementsByTagName("h5");
var ps = main.getElementsByTagName("p");

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollBtn.classList.remove("fade-out")
        scrollBtn.classList.add("fade-in")
    } else {
        scrollBtn.classList.remove("fade-in")
        scrollBtn.classList.add("fade-out")
    }

    getContent();
}

var fadeInPercent = 75;
function getContent() {
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    for (var i = 0; i < imgs.length; i++) {
        var distance = 100 / (vh / imgs[i].getBoundingClientRect().top)

        if (distance < fadeInPercent) {
            imgs[i].classList.add('display')
        }
    }

    for (var i = 0; i < h6s.length; i++) {
        var distance = 100 / (vh / h6s[i].getBoundingClientRect().top)

        if (distance < fadeInPercent) {
            h6s[i].classList.add('display')
        }
    }

    for (var i = 0; i < h5s.length; i++) {
        var distance = 100 / (vh / h5s[i].getBoundingClientRect().top)

        if (distance < fadeInPercent) {
            h5s[i].classList.add('display')
        }
    }

    for (var i = 0; i < ps.length; i++) {
        var distance = 100 / (vh / ps[i].getBoundingClientRect().top)

        if (distance < fadeInPercent) {
            ps[i].classList.add('display')
        }
    }
}

$(window).on("load", function () {
    if (window.innerWidth >= 811) {
        $(".loader-wrapper").delay(2000).fadeOut(0)

        if (saveScreen == "main") {
            $("#main-img").delay(2000).fadeIn(2000)
        }

        setTimeout(function () {
            $(".link").addClass('darken')
        }, 2000);

    } else {
        $(".link").delay(1800).fadeIn(2000)
        $(".loader-wrapper-menu").delay(2000).fadeOut(0)
    }

    setTimeout(function () {
        window.onscroll = function () { scrollFunction() };
    }, 2000);

    if (saveScreen !== "main") {
        setTimeout(function () {
            getContent();
        }, 4000);
    }
});

function closeProject() {
    window.history.pushState("", "", "/one-page-portfolio/");
    document.getElementById(saveScreen).style.display = 'none';
    scrollBtn.style.display = 'none';

    if (window.innerWidth >= 811) {
        main.style.display = "block";
        main.style.width = "calc(100% - 416px)";
        $("#main-img").fadeIn(2000)
        document.body.style.overflow = 'hidden';
    } else {
        sidebar.style.display = "flex";
        main.style.display = "none";
        main.style.width = "0";
        document.getElementsByClassName('close')[0].style.display = "none";
    }

    document.getElementsByClassName('active')[0] ? document.getElementsByClassName('active')[0].classList.remove('active') : null
    saveScreen = 'main';
}

var saveScreen;
saveScreen = 'main';
function link(a, id) {
    document.getElementById('loader-wrapper').style.display = 'flex';
    scrollBtn.style.display = 'flex';
    document.body.style.overflow = 'auto';

    if (window.innerWidth <= 810) {
        sidebar.style.display = "none";
        main.style.display = "block";
        main.style.width = "100%";
        document.getElementsByClassName('close')[0].style.display = "block";
    }

    saveScreen !== 'main' ? document.getElementById(saveScreen).style.display = 'none' : null;

    saveScreen = id;

    document.getElementById('main-img').style.display = "none"

    setTimeout(function () {
        $(".loader-wrapper").fadeOut(0);
    }, 2000);

    items = document.querySelectorAll('.link.active');

    if (items.length) {
        items[0].className = 'link darken';
    }

    a.className = 'link darken active';

    $('html, body').animate({
        scrollTop: $("#" + saveScreen).offset()
    });

    setTimeout(function () {
        $("img").removeClass("display")
        $("h6").removeClass("display")
        $("h5").removeClass("display")
        $("p").removeClass("display")
        $("#" + saveScreen).fadeIn(2000);
        getContent();

    }, 2000);

    if (saveScreen !== "main") {
        setTimeout(function () {
            getContent();
        }, 3000);
    }

    window.history.pushState("", "", "".concat('/one-page-portfolio/' + saveScreen));
}

function updateProjectUrl() {
    for (var i = 0; i < nav.getElementsByClassName('link').length; i++) {
        if (window.location.href.substring(window.location.href.lastIndexOf('/') + 1) == "" || window.location.href.substring(window.location.href.lastIndexOf('/') + 1) == "index.html") {
        }
        else if (!window.document.documentMode && nav.getElementsByClassName('link')[i].getAttribute('onclick').includes(window.location.href.substring(window.location.href.lastIndexOf('/') + 1))) {
            nav.getElementsByClassName('link')[i].click()
        }
        // IE
        else if (window.document.documentMode && nav.getElementsByClassName('link')[i].getAttribute('onclick').indexOf(window.location.href.substring(window.location.href.lastIndexOf('/') + 1)) > 0) {
            nav.getElementsByClassName('link')[i].click()
        }
    }
}

updateProjectUrl()

jQuery(document).ready(function ($) {

    if (window.history && window.history.pushState) {

        $(window).on('popstate', function () {
            if (window.location.href.substring(window.location.href.lastIndexOf('/')) !== '/') {
                updateProjectUrl()

            } else {
                closeProject()
            }
        });
    }
});
