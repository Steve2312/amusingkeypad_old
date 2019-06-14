$(document).ready(function () {

    document.getElementById("addtocart").addEventListener('click', function () {
        window.open('https://www.paypal.com/cgi-bin/webscr', 'paypal', 'width=400,height=700');
        document.getElementById("2kbuyform").submit();
    });

});
