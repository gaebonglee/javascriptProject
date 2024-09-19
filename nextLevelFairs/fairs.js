//-----마우스 움직이기-----\\
document.addEventListener("mousemove", (e) => {
  const cursorDefaultInner = document.querySelector(".cursor_default_inner");
  const cursorTraceInner = document.querySelector(".cursor_trace_inner");

  cursorDefaultInner.style.top = e.clientY + "px";
  cursorDefaultInner.style.left = e.clientX + "px";

  cursorTraceInner.style.top = e.clientY + "px";
  cursorTraceInner.style.left = e.clientX + "px";
});

const cursor = document.querySelector(".cursor");
document.addEventListener("mousedown", () => {
  cursor.classList.add("cursor_active");
});

document.addEventListener("mouseup", () => {
  cursor.classList.remove("cursor_active");
});

function createRipple(e) {
  let ripple = document.createElement("span");
  ripple.classList.add("ripple");

  cursor.appendChild(ripple);

  ripple.style.top = e.clientY - ripple.clientHeight / 2 + "px";
  ripple.style.left = e.clientX - ripple.clientHeight / 2 + "px";

  ripple.addEventListener("animationend", () => {
    cursor.removeChild(ripple);
  });
}
document.addEventListener("click", (e) => {
  createRipple(e);
});

const preloaderBtn = document.querySelector(".preloader_btn");

let intervalId = null;
let scale = 1;

const preloaderHideThreshold = 18;

function setPreloaderStyle(scale) {
  preloaderBtn.style.transform = `scale(${scale})`;
  document.querySelector(".preloader_btn_hold").style.opacity =
    1 - (scale - 1) / preloaderHideThreshold;
}

const header = document.querySelector(".header");

preloaderBtn.addEventListener("mousedown", () => {
  intervalId = setInterval(() => {
    scale += 0.175;
    setPreloaderStyle(scale);
    if (scale >= 1 + preloaderHideThreshold) {
      document.querySelector(".preloader").classList.add("hidden-area");
      header.classList.remove("hidden-area");
      header.classList.add("show_area");
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
