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

var db = firebase.firestore();

var docRef = db.collection("track_id").doc("KquEHhgciNNHa2yylrTb");

docRef.get().then(function (doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data().id);

        var options = doc.data().id
        var choice = getAllUrlParams().track_id;

        if (options.indexOf(choice) !== -1) {
            console.log('match');
            setTimeout(function () { fadeOutWaiting(); }, 2000);
            setTimeout(function () { found(); }, 3000);
            setTimeout(function () { redirect(); }, 5000);
        }

        if (options.indexOf(choice) === -1) {
            console.log('no match');
            setTimeout(function () { fadeOutWaiting(); }, 2000);
            setTimeout(function () { notfound(); }, 3000);
        }

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function (error) {
    console.log("Error getting document:", error);
    });

function found() {
    var waiting = document.getElementById("waiting");
    var found = document.getElementById("found");

    waiting.style.display = 'none';
    found.style.display = 'block';
}

function redirect() {
    location.replace(`https://steve2312.github.io/review.html?track_id=` + getAllUrlParams().track_id);
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