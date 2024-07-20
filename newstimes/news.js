const apikey = `bb76162003ae409691da5380af34daf5`;
let newsList = [];

const getNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apikey}`
  );
  const response = await fetch(url);
  const data = await response.json();

  newsList = data.articles;
  render();
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => ` <div class="row">
          <div class="col-lg-4">
            <img
              src=${news.urlToImage}
              class="newsImage"
            />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${news.description}</p>
             <div class="newsSourceDate">${news.source.name} / ${new Date(
        news.publishedAt
      ).toLocaleString()}</div>
          </div>
        </div>
        <div class="normalLine"></div>`
    )
    .join("");

  document.getElementById("newsBoard").innerHTML = newsHTML;
};

getNews();
for (let i = 0; i < 20; i++) {}
