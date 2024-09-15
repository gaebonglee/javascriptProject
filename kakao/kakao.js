const listStyleChangeStartY = 174;
const listStyleChangeEndY = 1585;

const listItems = document.querySelectorAll(".list-item");

const division =
  (listStyleChangeEndY - listStyleChangeStartY) / listItems.length;

const panel1Img = document.getElementById("panel1-img");
const moneyImage = document.getElementById("money-img");

window.addEventListener("scroll", () => {
  const currentOnElement = document.querySelector("#on");
  if (currentOnElement) {
    currentOnElement.removeAttribute("id");
  }

  if (
    window.scrollY > listStyleChangeStartY &&
    window.scrollY < listStyleChangeEndY
  ) {
    const targetIndex = Math.round(
      (window.scrollY - listStyleChangeStartY) / division
    );
    if (targetIndex >= 0 && targetIndex < listItems.length) {
      listItems[targetIndex].id = "on";
    }
  }

  const scrollYMoney = window.scrollY + document.documentElement.clientHeight;

  if (
    scrollYMoney > panel1Img.offsetTop &&
    scrollYMoney < panel1Img.offsetTop + panel1Img.offsetHeight + 100
  ) {
    const translateX =
      50 -
      (50 * 1.3 * (scrollYMoney - panel1Img.offsetTop)) /
        (panel1Img.offsetHeight + 100);

    const translateY =
      -15 +
      (15 * (scrollYMoney - panel1Img.offsetTop)) /
        (panel1Img.offsetHeight + 100);

    const rotateDeg =
      20 -
      (25 * 1.7 * (scrollYMoney - panel1Img.offsetTop)) /
        (panel1Img.offsetHeight + 100);

    moneyImage.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotateDeg}deg)`;
  }
});
