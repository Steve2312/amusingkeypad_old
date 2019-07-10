$(document).ready(function () {
    window.onscroll = function () { onscroll(); };

    var navbar = document.getElementById("navbar");
    var navbar2 = document.getElementById("navbar2");

    var footer = document.getElementById("footer_container");

    var scrollmenu = document.getElementById("scrollmenu_id");

    var sticky = navbar.offsetTop;

    function onscroll() {

        if (window.pageYOffset > sticky) {
            navbar.classList.add("sticky");
            navbar2.classList.add("sticky");

            footer.classList.add("footer_container_scroll");

            scrollmenu.classList.add("scrollmenu_scroll");
        } 
        if (!window.pageYOffset > sticky) {
            navbar.classList.remove("sticky");
            navbar2.classList.remove("sticky");

            footer.classList.remove("footer_container_scroll");

            scrollmenu.classList.remove("scrollmenu_scroll");
        }
    }
});

function clicksticky() {

    var navbar2 = document.getElementById("navbar2");
    var check = document.getElementById("collapsibleNavbar");
    var toggle = navbar2.classList.contains("clickstickyfirst");

    if (check.classList.contains("collapsing")) {
        return false;
    }

    if (!check.classList.contains("collapsing")) {
        if (toggle === false) {
            navbar2.classList.add("clickstickyfirst");
        }

        if (toggle === true) {
            navbar2.classList.remove("clickstickyfirst");
        }
    }

}

function copyToClipboard(text) {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', text);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    alert(text + " has been copied succesfully!");
}

function getAllUrlParams(url) {
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    var obj = {};
    if (queryString) {
        queryString = queryString.split('#')[0];
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            var a = arr[i].split('=');

            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            paramName = paramName.toLowerCase();
            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

            if (paramName.match(/\[(\d+)?\]$/)) {

                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                if (paramName.match(/\[\d+\]$/)) {
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    obj[key].push(paramValue);
                }
            } else {
                if (!obj[paramName]) {
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;
}

$(document).ready(function () {
    var l = window.localStorage || 0;

    var localCountry = l.getItem("country");

    var url2 = window.location.pathname;

    var supported = ["au", "at", "be", "br", "ca", "hk", "dk", "fi", "fr", "gr", "hu", "id", "ie", "il", "it", "jp", "kz", "kr", "lu", "my", "mx", "nl", "nz", "no", "pl", "pt", "ru", "sa", "sg", "es", "se", "ch", "th", "tr", "ua", "gb", "us", "vn", "gl"];


    if (window.localStorage) {

        if (l.getItem("country")) {
    
            if (getAllUrlParams().country) {
                
                var country = getAllUrlParams().country.toLowerCase();

                var a = l.getItem("country").toString();
                var b = country.toString();

                if (a.match(b)) {

                    return false;
                }

                if (!a.match(b)) {

                    if (supported.includes(country)) {
                        l.setItem("country", `${country}`);
                    }

                    if (!supported.includes(country)) {
                        window.location.replace(url2 + `?country=${localCountry}`);
                    }
                }
            }

            if (!getAllUrlParams().country) {
                window.location.replace(url2 + `?country=${localCountry}`);
            }
        }

        if (!l.getItem("country")) {

            if (getAllUrlParams().country) {

                var country = getAllUrlParams().country.toLowerCase();

                if (supported.includes(country)) {

                    console.log("match");
                    l.setItem("country", `${country}`);
                }

                if (!supported.includes(country)) {
                    l.setItem("country", `gl`);
                    window.location.replace(url2 + `?country=gl`);
                }
            }

            if (!getAllUrlParams().country) {
                l.setItem("country", `gl`);
                window.location.replace(url2 + `?country=gl`);
            }
        }
    }

    if (!window.localStorage) {
        window.location.replace(url2 + `?country=gl`);
    }
});

$(document).ready(function () {
    var flag = document.getElementById("flag");
    var flag2 = document.getElementById("flag2");
    if (getAllUrlParams().country) {
        var country = getAllUrlParams().country.toLowerCase();
        flag.src = `https://steve2312.github.io/flags/${country}.png`;
        flag2.src = `https://steve2312.github.io/flags/${country}.png`;
    }

});

function changeCountryTo(text) {
    var url2 = window.location.pathname;
    console.log(url2);
    window.location.replace(url2 + `?country=${text}`);
}

$(document).ready(function () {
    var scrollmenu = document.getElementById("scrollmenu_id");
    scrollmenu.style.display = "none";
});

function toggleCountryList() {
    var scrollmenu = document.getElementById("scrollmenu_id");
    var footer = document.getElementById("footer_container");

    if ($("#scrollmenu_id").hasClass('scrollmenu_hidden')) {
        setTimeout(function () {
            scrollmenu.classList.remove('scrollmenu_hidden');
            scrollmenu.classList.add('scrollmenu_show');
        }, 1);
        scrollmenu.style.display = "block";
    } else {
        scrollmenu.classList.add('scrollmenu_hidden');
        scrollmenu.classList.remove('scrollmenu_show');
        setTimeout(function () { scrollmenu.style.display = "none"; }, 500);
    }

    if ($("#scrollmenu_id").hasClass('scrollmenu_scroll') && $("#footer_container").hasClass('footer_container_scroll')) {
        footer.classList.remove("footer_container_scroll");
        scrollmenu.classList.remove("scrollmenu_scroll");
    } else {
        footer.classList.add("footer_container_scroll");
        scrollmenu.classList.add("scrollmenu_scroll");
    }
}