$(document).ready(function () {
    window.onscroll = function () { onscroll(); };

    var navbar = document.getElementById("navbar");
    var navbar2 = document.getElementById("navbar2");
    var sticky = navbar.offsetTop;

    

    function onscroll() {

        if (window.pageYOffset > sticky) {
            navbar.classList.add("sticky");
            navbar2.classList.add("sticky");
        } 
        if (!window.pageYOffset > sticky) {
            navbar.classList.remove("sticky");
            navbar2.classList.remove("sticky");
        }

        //var firstrow = document.getElementById("firstrow");
        //var firstrow2 = document.getElementById("firstrow2");
        //var firstrowtitle = document.getElementById("firstrowtitle");
        //if (window.pageYOffset > sticky) {
        //    firstrow.style.display = 'block';
        //    firstrow2.style.display = 'block';
        //    firstrowtitle.style.display = 'block';
        //} 
    }
});

window.onload = function () {
    particlesJS.load('particles-js', 'script/particle/setting.json', function () {
        console.log('callback - particles.js config loaded');
    });

    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 1,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 0.5,
                "direction": "top-right",
                "random": true,
                "straight": true,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "repulse"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": false
    });

    $(".scrolldown").click(function () {
        $('html,body').animate({
            scrollTop: $(".scrolldownarrow").offset().top
        },
        'slow');
    });
};

function submit() {
    var tarckAPI = "https://t.17track.net#nums=";
    var input = document.getElementById('tracking_number').value();

    if (!input) {
        return alert("Please provide a tracking number!");
    }

    if (input) {
        return window.open(tarckAPI + input); 
    }
}

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

function v3download() {
    var download = "https://gitee.com/Antecer/OsuKeyboard/raw/master/OsuKeyboard/bin/Release/OsuKeyboard.exe";
    window.open(download);
}
function prodownload() {
    var download = "https://github.com/Antecer/AmusingKeypad/releases/latest";
    window.open(download);
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


