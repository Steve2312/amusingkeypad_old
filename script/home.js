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
            scrollTop: $("#particles-js").offset().top
        },
            'slow');
    });
};

function submit() {
    var tarckAPI = "https://t.17track.net#nums=";
    var input = document.getElementById('tracking_number').value;

    if (!input) {
        return alert("Please provide a tracking number!");
    }

    if (input) {
        return window.open(tarckAPI + input);
    }
}

$(document).ready(function () {
    var lastQuote = 0;

    function changeQuote() {
        var quotes = [
            "Amusing Device",
            "Antecer",
            "Amusing Keypad"
        ];
        do {
            var rq = Math.floor(Math.random() * quotes.length);
        } while (rq === lastQuote);
        lastQuote = rq;
        var rQuote = quotes[rq];

        document.getElementById("rQuote").style.opacity = 0;

        setTimeout(function () {
            document.getElementById("rQuote").innerHTML = rQuote;
            document.getElementById("rQuote").style.opacity = 1;
        }, 1000);
    }

    setInterval(changeQuote, 7000);
});