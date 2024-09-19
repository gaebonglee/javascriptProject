document.addEventListener("mousemove", (e) => {
  const cursorDefaultInner = document.querySelector(".cursor__default__inner");
  const cursorTraceInner = document.querySelector(".cursor__trace__inner");

  cursorDefaultInner.style.top = e.clientY + "px";
  cursorDefaultInner.style.left = e.clientX + "px";

  cursorTraceInner.style.top = e.clientY + "px";
  cursorTraceInner.style.left = e.clientX + "px";
});

const cursor = document.querySelector(".cursor");

document.addEventListener("mousedown", () => {
  cursor.classList.add("cursor--active");
});

document.addEventListener("mouseup", () => {
  cursor.classList.remove("cursor--active");
});

function createRipple(e) {
  let ripple = document.createElement("span");

  ripple.classList.add("ripple");

  cursor.appendChild(ripple);

  ripple.style.top = e.clientY - ripple.clientHeight / 2 + "px";
  ripple.style.left = e.clientX - ripple.clientWidth / 2 + "px";

  ripple.addEventListener("animationend", () => {
    cursor.removeChild(ripple);
  });
}

document.addEventListener("click", (e) => {
  createRipple(e);
});

const preloaderBtn = document.querySelector(".preloader__btn");

let intervalId = null;
let scale = 1;

const preloaderHideThreshold = 18;

function setPreloaderStyle(scale) {
  preloaderBtn.style.transform = `scale(${scale})`;
  document.querySelector(".preloader__btn_hold").style.opacity =
    1 - (scale - 1) / preloaderHideThreshold;
}

const header = document.querySelector(".header");

preloaderBtn.addEventListener("mousedown", () => {
  intervalId = setInterval(() => {
    scale += 0.175;

    setPreloaderStyle(scale);

    if (scale >= 1 + preloaderHideThreshold) {
      document.querySelector(".preloader").classList.add("hidden-area");

      const poster = document.querySelector(".poster");

      header.classList.remove("hidden-area");
      poster.classList.remove("hidden-area");

      header.classList.add("shown-area");
      poster.classList.add("shown-area");

      clearInterval(intervalId);
    }
  }, 10);
});

preloaderBtn.addEventListener("mouseup", () => {
  clearInterval(intervalId);

  intervalId = setInterval(() => {
    scale -= 0.075;

    setPreloaderStyle(scale);

    if (scale <= 1) {
      clearInterval(intervalId);
    }
  }, 10);
});

header.addEventListener("mousemove", (e) => {
  const xRelativeToHeader = e.clientX / header.clientWidth;
  const yRelativeToHeader = e.clientY / header.clientHeight;

  document.querySelector(".header_title").style.transform = `translate(${
    xRelativeToHeader * -50
  }px,${yRelativeToHeader * -50}px)`;

  //".circle"클래스를 가진 여러 요소를 선택할 경우 querySelectorAll로 반환된 NodeList에 대해 forEach()를 사용하여 스타일을 개별적으로 적용
  document.querySelectorAll(".circle").forEach((circle) => {
    circle.style.transform = `translate(${xRelativeToHeader * -10}px, ${
      yRelativeToHeader * -30
    }px)`;
  });

  //querySelector()나 getElementById()는 문서 내에서 하나의 요소만 반환합니다. 이때 반환되는 요소는 단일 DOM 객체이며, 이 객체에 바로 스타일을 적용
  document.querySelector("#rectangle-1").style.transform = `translate(${
    xRelativeToHeader * -10
  }px, ${yRelativeToHeader * -30}px) rotate(125deg)`;
  document.querySelector("#rectangle-2").style.transform = `translate(${
    xRelativeToHeader * -25
  }px, ${yRelativeToHeader * -10}px) rotate(45deg)`;
  document.querySelector("#rectangle-3").style.transform = `translate(${
    xRelativeToHeader * -10
  }px, ${yRelativeToHeader * -30}px) rotate(140deg)`;
  document.querySelector("#rectangle-4").style.transform = `translate(${
    xRelativeToHeader * -25
  }px, ${yRelativeToHeader * -10}px) rotate(110deg)`;
  document.querySelector("#rectangle-5").style.transform = `translate(${
    xRelativeToHeader * -10
  }px, ${yRelativeToHeader * -30}px) rotate(35deg)`;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("posterImg_state_visible");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".posterImg_wrapper").forEach((poster) => {
  observer.observe(poster);
});
