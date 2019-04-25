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
            var html = document.getElementById("check");
            check.style.display = 'block';

        }

        if (options.indexOf(choice) === -1) {
            console.log('no match');
            var pagenotfound = document.getElementById("page_not_found");
            page_not_found.style.display = 'block';

            var trackingid = getAllUrlParams().track_id
            var e = document.getElementById("form_container");
            e.parentNode.removeChild(e);
        }

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function (error) {
    console.log("Error getting document:", error);
});

window.onload = function() {
    var trackingid = getAllUrlParams().track_id
    if (trackingid === undefined || trackingid === null) {
        var e = document.getElementById("form_container");
        e.parentNode.removeChild(e);
    }
}
