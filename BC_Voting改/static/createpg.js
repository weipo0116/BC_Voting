// 獲取 Add Option 按鈕和選項容器
const addOptionBtn = document.getElementById("add-option-btn");
const optionsContainer = document.getElementById("options-container");

// 創建一個堆疊（stack）來存儲選項
let optionsStack = [];

// 監聽 Add Option 按鈕的點擊事件
addOptionBtn.addEventListener("click", function () {
  // 獲取選項容器中已有的選項數量
  const optionCount = optionsStack.length + 2;

  // 創建一個新的選項輸入框
  const newOptionInput = document.createElement("input");
  newOptionInput.type = "text";
  newOptionInput.placeholder = `選項 ${optionCount} 答案`;
  newOptionInput.className = "option-input";
  newOptionInput.required = true;

  // 為選項輸入框添加標籤
  const newOptionLabel = document.createElement("label");
  newOptionLabel.htmlFor = "option";
  newOptionLabel.textContent = `選項 ${optionCount} : `;

  // 創建一個換行元素
  const lineBreak = document.createElement("br");

  // 將新選項輸入框、標籤和換行元素添加到選項容器中
  optionsContainer.appendChild(newOptionLabel);
  optionsContainer.appendChild(newOptionInput);
  optionsContainer.appendChild(lineBreak);

  // 將新選項加入堆疊中
  optionsStack.push({
    label: newOptionLabel,
    input: newOptionInput,
    lineBreak: lineBreak,
  });
});

const removeOptionBtn = document.getElementById("rmv-option-btn");
// 監聽 Remove Option 按鈕的點擊事件
removeOptionBtn.addEventListener("click", function () {
  // 確保至少保留一個選項
  if (optionsStack.length > 0) {
    const lastOption = optionsStack.pop();
    optionsContainer.removeChild(lastOption.label);
    optionsContainer.removeChild(lastOption.input);
    optionsContainer.removeChild(lastOption.lineBreak);
  }
});

let createdTopics = []; // 用於存儲已創建的投票主題

function createVote() {
  const topicInput = document.getElementById("poll-topic");
  const options = document.querySelectorAll(".option-input");
  const topic = topicInput.value;
  const optionValues = [];
  // 檢查是否所有選項都被填寫
  let allOptionsFilled = true;
  options.forEach((option) => {
    if (option.value.trim() === "") {
      allOptionsFilled = false;
      return;
    }
    optionValues.push(option.value);
  });

  if (!topic.trim() || !allOptionsFilled) {
    alert("請填寫所有項目！");
    return;
  }

  if (createdTopics.includes(topic)) {
    alert('該投票主題已存在，請修改！');
    return;
  }

  createdTopics.push(topic);

  // 將主題和選項存儲到 localStorage
  const polls = JSON.parse(localStorage.getItem('polls')) || [];
  polls.push({ topic: topic, options: optionValues });
  localStorage.setItem('polls', JSON.stringify(polls));

  // 這裡可以將主題和選項發送到後端進行處理，此處僅示範如何顯示在前端
  addTopicToList(topic, optionValues);

  // 清空輸入
  topicInput.value = "";
  options.forEach((option) => {
    option.value = "";
  });

  window.location.href = "/";
}

function addTopicToList(topic, options) {
  const topicList = document.getElementById("topic-list");
  const listItem = document.createElement("p");
  let optionsHTML = "";
  options.forEach((option, index) => {
    optionsHTML += `<p>選項 ${index + 1}: ${option}</p>`;
  });
  listItem.innerHTML = `
      <strong>投票主題：${topic}</strong>
      <div>${optionsHTML}</div><hr>`;
  topicList.appendChild(listItem);
}
