// 랜덤번호 지정
// 유저가 번호를 입력한다. "go"라는 버튼을 누름
// 만약 유저가 랜덤 번호를 맞추면 "맞췄습니다!", go 버튼 비활성화
// 랜덤번호 < 유저 번호 "down" 안내
// 랜덤번호 > 유저 번호 "up" 안내
// reset 버튼을 누르면 게임 리셋
// 5번의 기회를 다 쓰면 게임 끝 (더이상 추측 불가, 버튼 disable)
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않음.
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깎지 않음.

let computerNum = 0;
let playBtn = document.getElementById("playBtn");
let userInput = document.getElementById("userInput");
let reseultArea = document.getElementById("reseultArea");
let resetBtn = document.getElementById("resetBtn");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chanceArea");
let history = [];

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNum);
}

function play() {
  let userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    reseultArea.textContent = "1과 100사이의 숫자를 입력해주세요.";
    return;
  }

  if (history.includes(userValue)) {
    reseultArea.textContent =
      "이미 입력했던 숫자입니다. 다른 숫자를 입력해주세요.";
    return;
  }
  chances--;
  chanceArea.textContent = `남은기회 : ${chances}번`;
  console.log("chances", chances);

  if (userValue < computerNum) {
    reseultArea.textContent = "UP!!";
  } else if (userValue > computerNum) {
    reseultArea.textContent = "DOWN!!";
  } else {
    reseultArea.textContent = "정답입니다!";
    gameOver = true;
  }

  history.push(userValue);
  console.log(history);

  if (chances < 1) {
    gameOver = true;
  }
  if (gameOver == true) {
    playBtn.disabled = true;
  }
}

function reset() {
  userInput.value = "";
  pickRandomNum();

  return;
}

pickRandomNum();
