let votes = {
    option1: 120,
    option2: 50
};

let selectedOption = null;
let hasVoted = false;

function castVote(option) {
    if (!hasVoted) {
        selectedOption = option;
        for (let key in votes) {
            if (key === option) {
                document.getElementById(key).style.backgroundColor = '#5B7493';
            } else {
                document.getElementById(key).style.backgroundColor = '';
            }
        }
    }
}

function submitVote() {
    if (!hasVoted) {
        if (selectedOption) {
            votes[selectedOption]++;
            hasVoted = true;

            let chartContainer = document.getElementById('chart-container');
            chartContainer.style.display = 'block';

            let chartCanvas = document.getElementById('chart').getContext('2d');
            let chartData = {
                title: ['投票結果'],
                labels: ['理菜宴', '吳元應'],
                datasets: [{
                    data: [votes.option1, votes.option2],
                    backgroundColor: ['#36a2eb', '#ffcd56']
                }]
            };

            new Chart(chartCanvas, {
                type: 'bar',
                data: chartData,
                options: {
                    indexAxis: 'y',
                    plugins: {
                        title: {
                            display: true,
                            text: '投票結果',
                        },
                        legend: {
                            display: false // 將圖例設置為隱藏
                        }
                    }
                }
            });
        } else {
            alert('請選擇一個選項！');
        }
    } else {
        let button = document.querySelector('.submit-button');
        button.disabled = true; // 禁用按鈕
        button.style.backgroundColor = '#999'; // 設置背景顏色為灰色
        let warningMessage = document.createElement('span');
        warningMessage.textContent = '\t你已經投過票了喔！';
        warningMessage.style.color = 'red';
        button.parentNode.insertBefore(warningMessage, button.nextSibling);
    }
}
