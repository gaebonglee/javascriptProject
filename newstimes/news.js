const apikey = `bb76162003ae409691da5380af34daf5`;
let newsList = [];
const menus = document.querySelectorAll(".menuWrap button");
const searchInput = document.getElementById("searchInput");
const today = new Date();

// 상단 날짜 관련
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const dayName = days[today.getDay()];
const monthName = months[today.getMonth()];
const day = today.getDate();
const year = today.getFullYear();

const formattedDate = `${dayName}, ${monthName}, ${day}, ${year}`;
document.getElementById("currentDate").innerText = formattedDate;

menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

// 엔터키 누르면 검색어 입력
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getNewsByKeyword();
  }
});

let url = new URL(
  `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${apikey}`
);
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
  try {
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", pageSize);

    const response = await fetch(url);

    const data = await response.json();
    console.log("ddd", data);
    if (response.status === 200) {
      if (data.articles.length === 0) {
        if (page > 1) {
          page--; // 잘못된 페이지로 이동 시 이전 페이지로 돌아가기
          throw new Error(`No more articles found.`);
        }
        throw new Error(
          `'${searchInput.value}' No articles found for the given keyword.`
        );
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      pagiNationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatesNews = async () => {
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${apikey}`
  );
  page = 1; // 초기 페이지를 1로 설정
  getNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log(category);
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${apikey}`
  );
  page = 1; // 카테고리를 변경할 때 페이지 번호를 1로 초기화
  getNews();
};

const getNewsByKeyword = async () => {
  const keyword = searchInput.value;
  console.log("keyword", keyword);
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${apikey}`
  );
  page = 1; // 키워드 검색 시 페이지 번호를 1로 초기화
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

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
 ${errorMessage}
</div>`;
  document.getElementById("newsBoard").innerHTML = errorHTML;
};

getLatesNews();

// 페이지네이션 제작
const pagiNationRender = () => {
  const pageGroup = Math.ceil(page / groupSize);
  const totalPages = Math.ceil(totalResults / pageSize);
  let lastPage = pageGroup * groupSize;
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }

  const firstPage = Math.max(1, lastPage - (groupSize - 1));

  let pagiNationHTML = ``;

  // Previous 버튼 추가
  if (page > 1) {
    pagiNationHTML += `<li class="page-item"><a class="page-link" href="#" onclick="moveToPage(${
      page - 1
    })">Previous</a></li>`;
  }

  for (let i = firstPage; i <= lastPage; i++) {
    pagiNationHTML += `<li class="page-item ${
      i === page ? "active" : ""
    }" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
  }

  // Next 버튼 추가
  if (page < totalPages) {
    pagiNationHTML += `<li class="page-item"><a class="page-link" href="#" onclick="moveToPage(${
      page + 1
    })">Next</a></li>`;
  }

  document.querySelector(".pagination").innerHTML = pagiNationHTML;
};

const moveToPage = (pageNum) => {
  console.log("moveToPage", pageNum);
  page = pageNum;
  getNews();
};
