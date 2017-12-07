document.getElementById('random-article').addEventListener('click', function () {
  document.getElementById('search-form').reset();
  document.getElementById('output').innerHTML = '';
});

document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault();

  let query = document.getElementById('query').value;

  if (query === '') {
    Materialize.toast('Please enter search term', 3000);
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
      <div class="card">
        <div class="card-content">
          <span class="card-title">${title}</span>
          <p>${extract}</p>
          <div class="card-action">
            <a href="${url}" class="btn indigo darken-4" target="_blank">Go to article</a>
          </div>
        </div>
      </div>
    `;

    output.innerHTML += (content);
  }
}