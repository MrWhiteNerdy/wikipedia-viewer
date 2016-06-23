$(document).ready(function() {
    $("#searchBtn").on("click", function() {
        var query = $("#searchTxt");
        if (query.val() === "") {
            $(".error").show();
        } else {
            $(".error").hide();
            search(query);
            query.val("");
        }
    });
});

function search(query) {
    $.ajax({
        dataType: "jsonp",
        url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=info|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + query.val(),
        success: function(data) {
            var outcome = data.query.pages;
            $(".output").remove();
            for (var object in outcome) {
                $("#output").html("");
                var page = "https://en.wikipedia.org/?curid=" + object;
                var title = outcome[object].title;
                var extract = outcome[object].extract;
                var div = document.createElement("div");
                div.className = "output";
                div.innerHTML = "<h2><a target=\"_blank\" href=\"" + page + "\">" + title + "</a></h2>";
                div.innerHTML += "<p>" + extract + "</p>";
                document.body.appendChild(div);
            }
        }
    });
}
