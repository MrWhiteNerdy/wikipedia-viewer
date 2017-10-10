document.getElementById('random-article').addEventListener('click', function () {
    document.getElementById('search-form').reset();
    document.getElementById('output').innerHTML = '';
});

document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let query = document.getElementById('query').value;

    if (query === '') {
        document.querySelector('.alert-danger').style.display = 'block';

        setTimeout(function () {
            document.querySelector('.alert-danger').style.display = 'none';
        }, 3000);
    } else {
        search(query);
    }
});

function search(query) {
    fetch('https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=info|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=' + query)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            outputData(data);
        });
}

function outputData(data) {
    const output = document.getElementById('output');
    output.innerHTML = '';
    const pages = data.query.pages;

    for (let page in pages) {
        const url = "https://en.wikipedia.org/?curid=" + page;
        const title = pages[page].title;
        const extract = pages[page].extract;

        let content = `
            <div class="card mt-4">
                <div class="card-body">
                    <h4 class="card-title">${title}</h4>
                    <p class="card-text">${extract}</p>
                    <button class="btn btn-primary">
                        <a href="${url}" class="article-link" target="_blank">Go to article</a>
                    </button>
                </div>
            </div>
        `;

        output.innerHTML += (content);
    }
}
