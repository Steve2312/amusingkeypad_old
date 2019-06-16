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

console.log(getAllUrlParams().country);
console.log(getAllUrlParams().packagetype);
console.log(getAllUrlParams().color);



$(document).ready(function () {

    var a = getAllUrlParams().country;
    var b = getAllUrlParams().packagetype;
    var c = getAllUrlParams().color;

    if (b === "cherry-red") { b2 = "Cherry-Red"; }
    if (b === "cherry-brown") { b2 = "Cherry-Brown"; }
    if (b === "cherry-cyan") { b2 = "Cherry-Cyan"; }
    if (b === "cherry-black") { b2 = "Cherry-Black"; }
    if (b === "cherry-silver") { b2 = "Cherry-Silver"; }
    if (b === "cherry-all") { b2 = "Cherry-All"; }

    var products = ["cherry-red", "cherry-brown", "cherry-cyan", "cherry-black", "cherry-silver", "cherry-all"];

    if (c === "black") { c2 = "Black"; }
    if (c === "silver") { c2 = "Silver"; }

    var colors = ["black", "silver"];

    if (!a || !b || !c) {
        document.getElementById("form_container").style.display = "none";

        document.getElementById("page_not_found").style.display = "block";
    } else {

        if (products.includes(`${b}`)) {     
            document.getElementById("valuepackagetype").value = b2;

            if (colors.includes(`${c}`)) {
                document.getElementById("form_container").style.display = "block";

                document.getElementById("page_not_found").style.display = "none";

                document.getElementById("valuepackagetype").value = b2;

                document.getElementById("valuecolor").value = c2;

            } else {
                document.getElementById("form_container").style.display = "none";

                document.getElementById("page_not_found").style.display = "block";
            }

        } else {
            document.getElementById("form_container").style.display = "none";

            document.getElementById("page_not_found").style.display = "block";
        }
    }

    document.getElementById("addtocart").addEventListener('click', function () {
        console.log(document.getElementById("valuefirstname").value);
        //document.getElementById("paypalcheckout").submit();
    });

}); 