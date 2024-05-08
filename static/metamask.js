async function connectMetamask() {
    if (window.ethereum) { // 檢查是否支持 Metamask
        try {
            // 請求 Metamask 登入
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            let userAccount = accounts[0]; // 獲取用戶的帳號
            // 截取頭部和尾部各保留 5 個字符
            userAccount = userAccount.substring(0, 6) + '......' + userAccount.substring(userAccount.length - 6);
            document.getElementById('metamaskButton').textContent = userAccount; // 將按鈕上的文本設置為用戶的 Metamask 帳號
        } catch (error) {
            console.error('Metamask 登入失敗：', error);
        }
    } else {
        if (window.confirm('請安裝 Metamask 以繼續。'))
            {
            window.open('https://metamask.io/download/', '_blank');
            };
    }
}
