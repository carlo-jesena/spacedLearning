from flask import Flask, jsonify, request
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'pythontest'
app.config['MONGO_URI'] = 'mongodb://python:python@ds129469.mlab.com:29469/pythontest'

mongo = PyMongo(app)

### spaced repitition algorithm
def spaced_rep_algo(arr, answer):
    questions = arr.pop(0)
    (questions['m']) = (int(questions['m']))

    if answer == True:
        (questions['m']) *= 2
    else:
        questions['m'] = 1

    arr.insert(questions['m'], questions)

    return arr

### Add API endpoints here

# POST new user-- creates a user object with username, score and questions properties
@app.route('/users', methods=['POST'])
def create_new_user():
    users = mongo.db.users
    username = request.json['username']
    users.insert({
        'username' : username,
        'score' : 0,
        'questions' : [
            { 'question': "Salamat", 'answer': "Thank you", 'm': '1' },
            { 'question': "Kamusta", 'answer': "How are you", 'm': '1'},
            { 'question': "Oo", 'answer': "Yes", 'm': '1' },
            { 'question': "Hindi", 'answer': "No or Not", 'm': '1' },
            { 'question': "Ako", 'answer': "I or Me", 'm': '1' },
            { 'question': "Ikaw", 'answer': "You", 'm': '1' },
            { 'question': "Sarap", 'answer': "Delicious", 'm': '1' },
            { 'question': "Paumanhin", 'answer': "Sorry, excuse me", 'm': '1' },
            { 'question': "Paalam", 'answer': "Farewell", 'm': '1' },
            { 'question': "Tubig", 'answer': "Water", 'm': '1' }]
    })
    return jsonify({'message' : 'User created'})

# GET first question object and score of a logged in user
@app.route('/users/<username>', methods=['GET'])
def get_first_question(username):
    users = mongo.db.users

    q = users.find_one({'username' : username})
    output = {'score' : q['score'], 'questions' : q['questions']}

    return jsonify(output)

# GET user list
@app.route('/userlist', methods=['GET'])
def get_all_users():
    users = mongo.db.users
    user_list = []

    for q in users.find():
        user_list.append({'username' : q['username']})

    return jsonify(user_list)

# PUT to retrieve next question
@app.route('/answer/<username>', methods=['PUT'])
def get_next_question(username):
    users = mongo.db.users


### running on localhost:8080 instead of cloud9
if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=8080)
