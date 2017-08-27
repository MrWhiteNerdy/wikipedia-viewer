document.getElementById('random-article').addEventListener('click', function() {
    document.getElementById('search-form').reset();
    document.getElementById('output').innerHTML = '';
});

document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let query = document.getElementById('query').value;

    if (query == '') {
        document.querySelector('.alert-danger').style.display = 'block';

        setTimeout(function () {
            document.querySelector('.alert-danger').style.display = 'none';
        }, 3000);
    } else {
        search(query);
    }
});

function search(query) {
    $.ajax({
        dataType: "jsonp",
        url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=info|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + query,
        success: function (data) {
            var output = document.getElementById('output');
            output.innerHTML = '';
            var pages = data.query.pages;
            for (var page in pages) {
                var url = "https://en.wikipedia.org/?curid=" + page;
                var title = pages[page].title;
                var extract = pages[page].extract;

                var card = document.createElement("div");
                var cardBody = document.createElement("div");
                var cardTitle = document.createElement('h4');
                var cardText = document.createElement('p');
                var urlBtn = document.createElement('button');
                
                card.setAttribute('class', 'card mt-4');
                cardBody.setAttribute('class', 'card-body');
                cardTitle.setAttribute('class', 'card-title');
                cardText.setAttribute('class', 'card-text');
                urlBtn.setAttribute('class', 'btn btn-primary');
                
                cardTitle.textContent = title;
                cardText.textContent = extract;
                urlBtn.innerHTML = '<a href="' + url + '" target="_blank" class="article-link">Go to article</a>';

                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardText);
                cardBody.appendChild(urlBtn);
                card.appendChild(cardBody);
                output.appendChild(card);
            }
        }
    });
}