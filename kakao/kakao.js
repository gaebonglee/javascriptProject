const listStyleChangeStartY = 174;
const listStyleChangeEndY = 1585;

const listItems = document.querySelectorAll(".list-item");

const division =
  (listStyleChangeEndY - listStyleChangeStartY) / listItems.length;

const moneyImage = document.getElementById("money-img");

const startIndexForRotation = 22;
const endIndexForRotation = 25;

const videoPlayBack = 500;

const videoElement = document.getElementById("video");
const videoSection = document.getElementById("video-section");
const panel2Wrap = document.getElementById("panel2");

const panelTextRight = document.querySelector(".panelText.right");
const panelTextLeft = document.querySelector(".panelText.left");
let isPanelTextRightShown = false;
let isPanelTextLeftShown = false;

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

    if (video)
      video.currentTime =
        (window.scrollY - videoSection.offsetTop) / videoPlayBack;
  } else {
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

  // 비디오 중앙 위치 설정 및 스크롤 이벤트 처리
  videoCenterElement("panel2", videoElement);

  // 동영상이 화면을 벗어나면 고정 해제
  if (
    window.scrollY >
    videoSection.offsetTop +
      videoSection.offsetHeight -
      (panel2Wrap.offsetHeight +
        (document.documentElement.clientHeight - panel2Wrap.offsetHeight) / 2)
  ) {
    panel2Wrap.style.position = "relative";
    panel2Wrap.style.top = "initial";
    panel2Wrap.style.left = "initial";
    panel2Wrap.style.transform = `translateY(${
      videoSection.offsetHeight - panel2Wrap.offsetHeight
    }px)`;
  }
});
