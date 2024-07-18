const inputTesk = document.getElementById("inputTesk");
const addBtn = document.getElementById("addBtn");
const taps = document.querySelectorAll(".tapStyle");
let moveTab = "all";
let taskList = [];
let filterList = [];

addBtn.addEventListener("click", addTask);

for (let i = 0; i < taps.length; i++) {
  taps[i].addEventListener("click", function (event) {
    filter(event);
    setActiveTab(event.currentTarget); // 탭 클릭 시 활성화 함수 호출
  });
}

function addTask() {
  let task = {
    id: rendomIdGenerate(),
    taskContent: inputTesk.value,
    isComplete: false,
  };

  taskList.push(task);
  inputTesk.value = ""; // 입력 필드 초기화
  console.log(taskList);

  render();
}

function render() {
  let list = [];
  if (moveTab === "all") {
    list = taskList;
  } else if (moveTab === "onGoing" || moveTab === "done") {
    list = filterList;
  }

  let resultHTML = "";
  if (list.length === 0) {
    resultHTML = `<p>리스트가 비어있습니다</p>`;
  } else {
    for (let i = 0; i < list.length; i++) {
      if (list[i].isComplete) {
        resultHTML += `<div class="task">
              <p class="taskDone">${list[i].taskContent}</p>
              <div class="taskBtnWrap">
                <button onclick="completeTask('${list[i].id}')"><i class="ri-check-line"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="ri-delete-bin-6-line"></i></button>
              </div>
            </div>`;
      } else {
        resultHTML += `<div class="task">
          <p>${list[i].taskContent}</p>
          <div class="taskBtnWrap">
            <button onclick="completeTask('${list[i].id}')"><i class="ri-check-line"></i></button>
             <button onclick="deleteTask('${list[i].id}')"><i class="ri-delete-bin-6-line"></i></button>
          </div>
        </div>`;
      }
    }
  }
  document.getElementById("contentsBoard").innerHTML = resultHTML;
}

function completeTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(event) {
  moveTab = event.currentTarget.id;
  filterList = [];
  if (moveTab === "all") {
    render();
  } else if (moveTab === "onGoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (!taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
    console.log("진행중", filterList);
    render();
  } else if (moveTab === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function setActiveTab(activeTab) {
  taps.forEach((tap) => tap.classList.remove("active"));
  activeTab.classList.add("active");
}

// 정보에는 아이디값이 꼭 필요하다!
function rendomIdGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
