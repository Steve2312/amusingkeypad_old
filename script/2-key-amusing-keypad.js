$(document).ready(function () {

    document.getElementById("addtocart").addEventListener('click', function () {

        var p = document.querySelector('.packagetype:checked');
        var c = document.querySelector('.color:checked');

        if (!p) {
            document.getElementById("packagetypetext").style.color = "red";
        }

        if (p) {
            document.getElementById("packagetypetext").style.color = "white";
        }

        if (!c) {
            document.getElementById("colortext").style.color = "red";
        }

        if (c) {
            document.getElementById("colortext").style.color = "white";
        }

        if (p || c) {
            var l = window.localStorage || 0;

            var localCountry = l.getItem("country");

            var url2 = window.location.pathname;

            window.location.replace(url2 + `/checkout/` + `?country=${localCountry}` + `&packagetype=${p.value}&color=${c.value}`);
        }
    });

});
