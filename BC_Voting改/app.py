from flask import Flask, render_template, request, jsonify, g
import mysql.connector

app = Flask(__name__)

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'your_mysql_username'
app.config['MYSQL_PASSWORD'] = 'your_mysql_password'
app.config['MYSQL_DB'] = 'votes'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = mysql.connector.connect(
            host=app.config['MYSQL_HOST'],
            user=app.config['MYSQL_USER'],
            password=app.config['MYSQL_PASSWORD'],
            database=app.config['MYSQL_DB']
        )
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/', methods=['POST'])
def create_vote():
    option = request.form['option']
    db = get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO votes (option_name, count) VALUES (%s, 0)", (option,))
    db.commit()
    cursor.close()
    return "新增投票成功!"

@app.route('/create-vote-page')
def create_vote_page():
    return render_template('createPg.html')

@app.route('/vote', methods=['POST'])
def vote():
    option = request.form['option']
    db = get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE votes SET count = count + 1 WHERE option_name = %s", (option,))
    db.commit()
    cursor.close()
    return "投票成功！"

@app.route('/api/results')
def get_results():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM votes")
    data = cursor.fetchall()
    results = {}
    for row in data:
        results[row[1]] = row[2]
    cursor.close()
    return jsonify(results)

@app.route('/api/active-votes')
def get_active_votes():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM votes")
    data = cursor.fetchall()
    active_votes = []
    for row in data:
        active_votes.append({
            'option': row[1],
            'count': row[2]
        })
    cursor.close()
    return jsonify(active_votes)

@app.route('/poll-details')
def poll_details():
    return render_template('poll_details.html')

if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=True)
