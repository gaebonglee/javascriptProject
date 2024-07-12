// 랜덤번호 지정 - 완료
// 유저가 번호를 입력한다. "go"라는 버튼을 누름 - 완료
// 만약 유저가 랜덤 번호를 맞추면 "맞췄습니다!", go 버튼 비활성화
// 랜덤번호 < 유저 번호 "down" 안내 - 완료
// 랜덤번호 > 유저 번호 "up" 안내 - 완료
// reset 버튼을 누르면 게임 리셋
// 5번의 기회를 다 쓰면 게임 끝 (더이상 추측 불가, 버튼 disable)
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려준다.- 완료  기회를 깎지 않음.
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깎지 않음.

let randomNum = 0;
let goBtn = document.getElementById("goBtn");
let resetBtn = document.getElementById("resetBtn");
let userInput = document.getElementById("userInput");
let reseultArea = document.getElementById("reseultArea");
let chanceArea = document.getElementById("chanceArea");
let chances = 5;
let gameOver = false;
let history = [];

goBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function pickRandomNum() {
  randomNum = Math.floor(Math.random() * 100) + 1;
  console.log("컴퓨터 랜덤 숫자 :", randomNum);
}

function play() {
  let userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    reseultArea.textContent = "1과 100사이의 숫자를 입력해주세요.";

    return;
  }

  if (history.includes(userValue)) {
    console.log(history);
    reseultArea.textContent =
      "이미 입력했던 숫자입니다. 다른 숫자를 입력해주세요.";

    return;
  }
  chances--;
  chanceArea.textContent = `${chances}번`;

  if (userValue < randomNum) {
    reseultArea.textContent = "UP!";
  } else if (userValue > randomNum) {
    reseultArea.textContent = "DOWN!";
  } else {
    reseultArea.textContent = "정답입니다!";
    gameOver = true;
  }

  history.push(userValue);

  if (chances < 1) {
    gameOver = true;
  }
  if (gameOver == true) {
    goBtn.disabled = true;
  }
}

function reset() {
  userInput.value = "";
  pickRandomNum();
  reseultArea.textContent = "";
  chances = 5;
  chanceArea.textContent = `${chances}번`;
  history = [];
  gameOver = false;
  goBtn.disabled = false;

  return;
}
// Math.random()  : 0부터 1사이
//Math.floor() :소수 1번째자리 버림

pickRandomNum();
