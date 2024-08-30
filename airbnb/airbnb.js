document.addEventListener("DOMContentLoaded", () => {
  const typeBtn = document.querySelectorAll(".typeBtn");
  typeBtn[0].classList.add("active");

  typeBtn.forEach((button) => {
    button.addEventListener("click", () => {
      typeBtn.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const categoryBtn = document.querySelectorAll(".category-btn");
  categoryBtn.forEach((button) => {
    button.addEventListener("click", () => {
      categoryBtn.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const arrowPrev = document.querySelector(".arrowBtn.prev");
  const arrowNext = document.querySelector(".arrowBtn.next");
  const categoryBar = document.getElementById("category-bar");

  arrowPrev.addEventListener("click", () => {
    categoryBar.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  });
  arrowNext.addEventListener("click", () => {
    categoryBar.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const heartIcons = document.querySelectorAll(
    ".ri-heart-line, .ri-heart-fill"
  );

  heartIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      icon.classList.toggle("ri-heart-line");
      icon.classList.toggle("ri-heart-fill");
    });
  });
});
