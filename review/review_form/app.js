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

firebase.initializeApp({
    projectId: 'bothibiki-190909'
});

console.log(getAllUrlParams().track_id);
window.onload = function () {

    var track_id_from_url = getAllUrlParams().track_id;

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

function getDataForm() {
    var name = document.getElementById("form_name");
    var rating = document.getElementById("form_rating");
    var issues = document.getElementById("form_issues");
    var thoughts = document.getElementById("form_thoughts");

    var data_name = name.value;
    var data_rating = rating.value;
    var data_issues = issues.value;
    var data_thoughts = thoughts.value;

    if (data_name == "") {
        name.style.border = "1px solid red"; 

        if (data_rating == "Select rating") {
            rating.style.border = "1px solid red";
        }
    }

    if (!data_name == "") {
        if (data_rating == "Select rating") {
            rating.style.border = "1px solid red";
        }

        else {

            const regex = /L\S\d{9}CN/g;
            const str = getAllUrlParams().track_id;
            var track_id_from_url = getAllUrlParams().track_id;

            if (str.toUpperCase().match(regex)) {
                var db = firebase.firestore();
                var trackdb = db.collection("used_track_ids").doc(track_id_from_url.toUpperCase());
                trackdb.get().then(function (doc) {
                    if (doc.exists) {
                        return alert("Track ID already used");
                    }

                    if (!doc.exists) {

                        var db = firebase.firestore();
                        var docReview = db.collection("reviews");
                        var docUsed = db.collection("used_track_ids");

                        var docReviewData = {
                            name: data_name,
                            rating: data_rating,
                            issues: data_issues,
                            thoughts: data_thoughts
                        };

                        var docUsedData = {
                            form: "true"
                        };

                        submitToDB();

                        function submitToDB() {
                            docReview.doc(track_id_from_url.toUpperCase()).set(docReviewData);
                            docUsed.doc(track_id_from_url.toUpperCase()).set(docUsedData);
                            setTimeout(function () { fadeOutForm(); }, 10);
                            setTimeout(function () { hideForm(); }, 1000);
                            setTimeout(function () { showThanks(); }, 2000);
                        }

                        function fadeOutForm() {
                            var form_container = document.getElementById("form_container");

                            form_container.classList.remove("fadeIn");
                            form_container.classList.add("fadeOut");
                        }

                        function hideForm() {
                            var form_container = document.getElementById("form_container");
                            form_container.style.display = 'none';
                        }

                        function showThanks() {
                            var thanks_form = document.getElementById("thanks_form");
                            thanks_form.style.display = 'block';
                        }
                    }
                });
            }
            if (!str.toUpperCase().match(regex)) {
                return alert("Error Submitting Form");
            }
            
        }
    }
}
