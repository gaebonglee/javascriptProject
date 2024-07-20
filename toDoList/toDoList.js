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

const inputTesk = document.getElementById("inputTesk");
const addButton = document.getElementById("addBtn");
taskList = [];
addButton.addEventListener("click", addTask);

function addTask() {
  let task = {
    id: rendomIdGenerate(),
    taskContent: inputTesk.value,
    isComplete: false,
  };
  inputTesk.value = "";
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = `<p>리스트가 비어있습니다</p>`;
  for (let i = 0; i < taskList.length; i++) {
    if (taskList.isComplete == true) {
      resultHTML += `<div class="task">
            <p class="taskDone">${taskList[i].taskContent}</p>
            <div class="taskBtnWrap">
              <button onclick="completeTask('${taskList[i]}')"><i class="ri-check-line"></i></button>
              <button onclick="deleteTask('${taskList[i]}')"><i class="ri-delete-bin-6-line"></i></button>
            </div>
          </div>`;
    } else {
      resultHTML += `<div class="task">
      <p class="taskDone">${taskList[i].taskContent}</p>
      <div class="taskBtnWrap">
        <button onclick="completeTask('${taskList[i]}')"><i class="ri-check-line"></i></button>
        <button onclick="deleteTask('${taskList[i]}')"><i class="ri-delete-bin-6-line"></i></button>
      </div>
    </div>`;
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

// 정보에는 아이디값이 꼭 필요하다!
function rendomIdGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
