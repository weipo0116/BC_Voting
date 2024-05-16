fetch("/api/active-votes")
  .then((response) => response.json())
  .then((data) => {
    const voteList = document.getElementById("voteList");

    data.forEach((vote) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${vote.option}: ${vote.count} 票`;
      voteList.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error("獲取投票資料時出現錯誤:", error);
  });
