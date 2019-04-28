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

console.log(getAllUrlParams().track_id);
window.onload = function () {

    var track_id_from_url = getAllUrlParams().track_id;

    if (track_id_from_url) {
        const regex = /L\S\d{9}CN/g;
        const str = getAllUrlParams().track_id;

        if (str.toUpperCase().match(regex)) {
            var track_id_from_url = getAllUrlParams().track_id;

            firebase.initializeApp({
                projectId: 'bothibiki-190909'
            });

            var db = firebase.firestore();
            var trackdb = db.collection("used_track_ids").doc(track_id_from_url.toUpperCase());
            trackdb.get().then(function (doc) {
                if (doc.exists) {
                    console.log("Already filled it in");
                    var thanks_form = document.getElementById("thanks_form");
                    thanks_form.style.display = 'block';
                }

                if (!doc.exists) {
                    console.log('Not filled in');
                    var form_container = document.getElementById("form_container");
                    form_container.style.display = 'block';
                }
            });
        }
        if (!str.toUpperCase().match(regex)) {
            console.log('no match');
            var pagenotfound = document.getElementById("page_not_found");
            pagenotfound.style.display = 'block';
        }
    }

    var trackingid = getAllUrlParams().track_id
    if (trackingid === undefined || trackingid === null) {
        var e = document.getElementById("form_container");
        e.parentNode.removeChild(e);

        console.log('no match');
        var pagenotfound = document.getElementById("page_not_found");
        pagenotfound.style.display = 'block';
    }
}
