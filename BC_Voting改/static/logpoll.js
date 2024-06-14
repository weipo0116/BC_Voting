const polls = JSON.parse(localStorage.getItem("polls")) || [];

// 將投票數據顯示在 left_container 中
const leftContainer = document.getElementById("left_container");

polls.forEach((poll) => {
  const pollElement = document.createElement("div");
  pollElement.className = "poll-card";

  const topicLink = document.createElement('a');
  topicLink.href = `/poll-details?topic=${encodeURIComponent(poll.topic)}`; // 指向 Flask 路由

  const topicElement = document.createElement("h3");
  topicElement.innerHTML = `投票主題：<br>${poll.topic}`;

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
