//유저가 값을 입력한다
//+버튼을 클릭하면, 할 일이 추가된다.
//delete버튼을 클릭하면, 할 일이 삭제된다.

//check버튼을 누르면, 할 일이 끝나면서 밑줄이 그어진다.
//check버튼을 누르는 순간 isComplete:true
//isComplete:true 이면 끝난 걸로 간주하고 밑줄
//isComplete:false 이면 끝나지 않은 걸로 간주하고 유지

//not done 과 done 각 탭 이동 시 밑줄 따라감
//done 탭에는 끝난 일만, not done 탭에는 진행중인 일만
//all 탭을 누르면 전체 할 일들을 보여줌

let inputTesk = document.getElementById("inputTesk");
let addBtn = document.getElementById("addBtn");
let tabs = document.querySelectorAll(".manuTabs div");
let taskList = [];
let movetab = "all";
let filterList = [];
addBtn.addEventListener("click", addTesk);

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTesk() {
  let task = {
    id: rendomIdGenerate(),
    taskContent: inputTesk.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let list = [];
  // 1. 내가 선택한 탭에 따라
  if (movetab === "all") {
    list = taskList;
  } else if (movetab === "ongoing" || movetab === "done") {
    list = filterList;
    //ongoing taskList
  }
  // 2. 리스트를 달리 보여준다.

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
                <div class="taskDone">${list[i].taskContent}</div>
                <div>
                  <button onclick="toggleComplete('${list[i].id}')">check</button>
                  <button onclick="deleteTask('${list[i].id}')">delete</button>
                </div>
        </div>`;
    } else {
      resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')">check</button>
          <button onclick="deleteTask('${list[i].id}')">delete</button>
        </div>
      </div>`;
    }
  }
  document.getElementById("taskBoard").innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log("id", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      // true 와 false 가 바뀌는 과정 중요함
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(event) {
  console.log("filter", event.target.id);
  movetab = event.target.id;

  filterList = [];
  if (movetab === "all") {
    render();
    //전체리스트를보여준다
  } else if (movetab === "ongoing") {
    //진행중인 콘텐츠 보여주기 isComplete:false
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("진행중", filterList);
  } else if (movetab === "done") {
    //끝나는 케이스 isComplete:true
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}
//정보에는 아이디값이 꼭 필요하다!
function rendomIdGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
