const listStyleChangeStartY = 174;
const listStyleChangeEndY = 1585;

const listItems = document.querySelectorAll(".list-item");
const moneyImage = document.getElementById("money-img");

const division =
  (listStyleChangeEndY - listStyleChangeStartY) / listItems.length;

const startIndexForRotation = 22;
const endIndexForRotation = 25;

const videoPlayBack = 500;

const videoElement = document.getElementById("video");
const videoSection = document.getElementById("video-section");
const fixedWrapper = document.getElementById("fixed-wrapper");

function videoCenterElement(elementId, video) {
  const element = document.getElementById(elementId);
  const parent = element.parentElement;

  if (
    window.scrollY >
    parent.offsetTop -
      (document.documentElement.clientHeight - element.offsetHeight) / 2
  ) {
    element.style.position = "fixed";
    element.style.top = "50%";
    element.style.left = "50%";
    element.style.transform = "translate(-50%, -50%)";
  }
  if (video)
    video.currentTime =
      (window.scrollY - videoSection.offsetTop) / videoPlayBack;
  else {
    element.style.position = "relative";
    element.style.top = "initial";
    element.style.left = "initial";
    element.style.transform = "initial";
  }
}

videoElement.addEventListener("loadedmetadata", () => {
  document.getElementById("video-section").style.height =
    videoElement.duration * videoPlayBack + "px";
});

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
    if (
      targetIndex >= startIndexForRotation &&
      targetIndex <= endIndexForRotation
    ) {
      // 회전 진행도 계산
      const rotationFraction =
        (targetIndex - startIndexForRotation) /
        (endIndexForRotation - startIndexForRotation);
      const rotation = -20 + rotationFraction * 35;
      moneyImage.style.transform = `rotate(${rotation}deg)`;
    } else if (targetIndex < startIndexForRotation) {
      moneyImage.style.transform = `rotate(-20deg)`;
    } else if (targetIndex > endIndexForRotation) {
      moneyImage.style.transform = `rotate(15deg)`;
    }
  }
  videoCenterElement("fixed-wrapper", videoElement);
  if (
    window.scrollY >
    videoSection.offsetTop +
      videoSection.offsetHeight -
      (document.documentElement.clientHeight = fixedWrapper.offsetHeight) / 2
  ) {
    fixedWrapper.style.position = "relative";
    fixedWrapper.style.top = "initial";
    fixedWrapper.style.left = "initial";
    fixedWrapper.style.transform = `translateY(${
      videoSection.offsetHeight - fixedWrapper.offsetHeight
    }px)`;
  }
});
