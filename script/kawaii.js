$(document).ready(function () {
window.onscroll = function () { myFunction() };

    var navbar = document.getElementById("navbar");
    var navbarmargin = document.getElementById("navbarmargin");
    var sticky = navbar.offsetTop;
    var x = window.matchMedia("(max-width: 974px)")

    console.log(window.pageYOffset);

    function myFunction() {
        if (window.pageYOffset > sticky) {
            navbar.classList.add("sticky")
        } 
        if (!window.pageYOffset > sticky) {
            navbar.classList.remove("sticky");
        }

        var firstrow = document.getElementById("firstrow");
        var firstrow2 = document.getElementById("firstrow2");
        var firstrowtitle = document.getElementById("firstrowtitle");
        if (window.pageYOffset > sticky) {
            firstrow.style.display = 'block';
            firstrow2.style.display = 'block';
            firstrowtitle.style.display = 'block';
        } 
    }
});

function submit() {
    var tarckAPI = "https://t.17track.net#nums=";
    var input = document.getElementById('tracking_number').value

    if (!input) {
        return alert("Please provide a tracking number!");
    }

    if (input) {
        return window.open(tarckAPI + input); 
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