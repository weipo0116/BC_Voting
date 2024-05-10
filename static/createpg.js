// 獲取 Add Option 按鈕和選項容器
const addOptionBtn = document.getElementById('add-option-btn');
const optionsContainer = document.getElementById('options-container');

// 創建一個堆疊（stack）來存儲選項
let optionsStack = [];

// 監聽 Add Option 按鈕的點擊事件
addOptionBtn.addEventListener('click', function() {
    // 獲取選項容器中已有的選項數量
    const optionCount = optionsStack.length + 2;

    // 創建一個新的選項輸入框
    const newOptionInput = document.createElement('input');
    newOptionInput.type = 'text';
    newOptionInput.placeholder = `選項 ${optionCount} 答案`;
    newOptionInput.className = 'option-input';
    newOptionInput.required = true;

    // 為選項輸入框添加標籤
    const newOptionLabel = document.createElement('label');
    newOptionLabel.htmlFor = 'option';
    newOptionLabel.textContent = `選項 ${optionCount} : `;

    // 創建一個換行元素
    const lineBreak = document.createElement('br');

    // 將新選項輸入框、標籤和換行元素添加到選項容器中
    optionsContainer.appendChild(newOptionLabel);
    optionsContainer.appendChild(newOptionInput);
    optionsContainer.appendChild(lineBreak);

    // 將新選項加入堆疊中
    optionsStack.push({
        label: newOptionLabel,
        input: newOptionInput,
        lineBreak: lineBreak
    });
});

const removeOptionBtn = document.getElementById('rmv-option-btn');
// 監聽 Remove Option 按鈕的點擊事件
removeOptionBtn.addEventListener('click', function() {
    // 確保至少保留一個選項
    if (optionsStack.length > 0) {
        const lastOption = optionsStack.pop();
        optionsContainer.removeChild(lastOption.label);
        optionsContainer.removeChild(lastOption.input);
        optionsContainer.removeChild(lastOption.lineBreak);
    }
});
