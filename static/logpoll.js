const polls = JSON.parse(localStorage.getItem("polls")) || [];

// 將投票數據顯示在 left_container 中
const leftContainer = document.getElementById("left_container");

polls.forEach((poll) => {
  const pollElement = document.createElement("div");
  pollElement.className = "poll-card";

  const topicLink = document.createElement('a');
  topicLink.href = '#'; // 此处添加跳转链接，你可以在后面添加具体的跳转目标
  topicLink.onclick = function() {
    // 这里可以添加点击卡片后的具体操作，比如跳转到投票详情页
    alert(`進到投票主題：${poll.topic}`);
  };

  const topicElement = document.createElement("h3");
  topicElement.textContent = `投票主題：${poll.topic}`;

  const optionsList = document.createElement("div");
  poll.options.forEach((option) => {
    const optionItem = document.createElement("span");
    optionItem.textContent = `${option}. `;
    optionsList.appendChild(optionItem);
  });

  topicLink.appendChild(topicElement);
  topicLink.appendChild(optionsList);
  pollElement.appendChild(topicLink);
  leftContainer.appendChild(pollElement);
});
