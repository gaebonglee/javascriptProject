const apikey = `bb76162003ae409691da5380af34daf5`;
let newsList = [];
const menus = document.querySelectorAll(".menuWrap button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

let url = new URL(
  `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${apikey}`
);

const getNews = async () => {
  const response = await fetch(url);
  const data = await response.json();

  newsList = data.articles;

  render();
};

const getLatesNews = async () => {
  url = new URL();
  getNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log(category);
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${apikey}`
  );
  getNews();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("searchInput").value;
  console.log("keyword", keyword);
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${apikey}`
  );
  getNews();
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => ` <div class="row">
          <div class="col-lg-4">
            <img
              src=${news.urlToImage}
              class="newsImage"
              alt="${news.title}"
            />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${
              news.description ? news.description : "No description available."
            }</p>
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

//1.버튼들에 클릭이벤트 추가
//2.카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기
