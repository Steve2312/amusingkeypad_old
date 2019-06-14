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

firebase.initializeApp({
    projectId: 'bothibiki-190909'
});

window.onload = function () {
    var track_id_from_url = getAllUrlParams().track_id;


    if (!track_id_from_url) {
        console.log('no match');
        setTimeout(function () { fadeOutWaiting(); }, 2000);
        setTimeout(function () { notfound(); }, 3000);
    }

    if (track_id_from_url) {
        const regex = /L\S\d{9}CN/g;
        const str = getAllUrlParams().track_id;

        if (str.toUpperCase().match(regex)) {
            var track_id_from_url = getAllUrlParams().track_id;

            var db = firebase.firestore();
            var trackdb = db.collection("used_track_ids").doc(track_id_from_url.toUpperCase());
            trackdb.get().then(function (doc) {
                if (doc.exists) {
                    console.log("Already filled it in");
                    setTimeout(function () { fadeOutWaiting(); }, 2000);
                    setTimeout(function () { already_filled(); }, 3000);
                }

                if (!doc.exists) {
                    console.log('Not filled in');
                    setTimeout(function () { fadeOutWaiting(); }, 2000);
                    setTimeout(function () { found(); }, 3000);
                    setTimeout(function () { redirect(); }, 5000);
                }
            });
        }
        if (!str.toUpperCase().match(regex)) {
            console.log('no match');
            setTimeout(function () { fadeOutWaiting(); }, 2000);
            setTimeout(function () { notfound(); }, 3000);
        }
    }

    function found() {
        var waiting = document.getElementById("waiting");
        var found = document.getElementById("found");

        waiting.style.display = 'none';
        found.style.display = 'block';
    }

    function already_filled() {
        var waiting = document.getElementById("waiting");
        var already_filled = document.getElementById("already_filled");

        waiting.style.display = 'none';
        already_filled.style.display = 'block';
    }

    function redirect() {
        var track_id = getAllUrlParams().track_id
        window.location.href = `../review/review_form/index.html?track_id=${track_id.toUpperCase()}`;
    }

    function notfound() {
        var waiting = document.getElementById("waiting");
        var notfound = document.getElementById("notfound");

        waiting.style.display = 'none';
        notfound.style.display = 'block';
    }

    function fadeOutWaiting() {
        var waiting = document.getElementById("waiting");

        waiting.classList.remove("fadeIn");
        waiting.classList.add("fadeOut");
    }
}