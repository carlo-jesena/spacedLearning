from flask import Flask, jsonify, request
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGOA_DBNAME'] = 'pythontest'
app.config['MONGO_URI'] = 'mongodb://python:python@ds129469.mlab.com:29469/pythontest'

mongo = PyMongo(app)


@app.route('/add')
def add():
    user = mongo.db.users
    user.insert({'username' : 'Chris'})
    return 'Added User!'

@app.route('/userlist', methods=['GET'])
def get_all_users():
    users = mongo.db.users

    userList = []

    for q in users.find():
        userList.append({'username' : q['username']})

    return jsonify({'result' : userList})

# @app.route("/hello")
# def say_hi():
#     return "Hello World!"



### running on localhost:8080 instead of cloud9
if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=8080)
