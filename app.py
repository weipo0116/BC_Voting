from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

# 設置 SQLite 數據庫連接
conn = sqlite3.connect('votes.db', check_same_thread=False)
c = conn.cursor()

# 首頁路由，顯示投票頁面
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/create-vote', methods=['POST'])
def create_vote():
    option = request.form['option']
    c.execute("INSERT INTO votes (option, count) VALUES (?, 0)", (option,))
    conn.commit()
    return "新增投票成功!"

@app.route('/create-vote-page')
def create_vote_page():
    return render_template('createPg.html')


# 投票接口，接收投票並更新數據庫
@app.route('/vote', methods=['POST'])
def vote():
    option = request.form['option']
    c.execute("UPDATE votes SET count = count + 1 WHERE option = ?", (option,))
    conn.commit()
    return "投票成功！"

# 提供投票結果的 API 接口
@app.route('/api/results')
def get_results():
    c.execute("SELECT * FROM votes")
    data = c.fetchall()
    results = {'理菜宴': 0, '吳元應': 0}
    for row in data:
        results[row[1]] = row[2]
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
