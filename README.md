## 安裝步驟

為了確保正確的執行，請按照以下步驟進行安裝：

1. 使用 [Anaconda]([url]('https://www.anaconda.com/download/success')) 創建一個名為 `vote` 的虛擬環境：

    ```bash
    conda create --name vote python=3.9.16
    ```

2. 啟動 `vote` 虛擬環境：

    ```bash
    conda activate vote
    ```

3. 在虛擬環境中安裝 Flask：

    ```bash
    pip install flask
    ```

## 執行應用程式

安裝完成後，您可以執行以下命令來啟動應用程式：

```bash
python app.py
```

這將啟動 Flask 開發伺服器，您可以在瀏覽器中通過訪問 `http://localhost:5000` 來訪問應用程式。

