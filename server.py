from flask import Flask, jsonify, request
from flask_pymongo import PyMongo

app = Flask(__name__, static_url_path='', static_folder='build/dev/client')

app.config['MONGO_DBNAME'] = 'pythontest'
app.config['MONGO_URI'] = 'mongodb://python:python@ds129469.mlab.com:29469/pythontest'

mongo = PyMongo(app)

### serve static files
@app.route('/')
def root():
    with open("build/dev/client/index.html") as f:
        return f.read()

### spaced repitition algorithm
def spacedRepAlgo(arr, answer):
    questions = arr.pop(0)
    questions['m'] = (int(questions['m']))

    if answer == True:
        questions['m'] *= 2
    else:
        questions['m'] = 1

    arr.insert(questions['m'], questions)

    return arr

### Add API endpoints here

# POST new user-- creates a user object with username, score and questions properties
@app.route('/users/<newUser>', methods=['POST'])
def create_new_user(newUser):
    users = mongo.db.users

    users.insert({
        'username' : newUser,
        'score' : 0,
        'questions' : [
            { 'question': 'el caballo', 'answer': 'horse', 'm': '1' },
            { 'question': 'el cerdo', 'answer': 'pig', 'm': '1'},
            { 'question': 'la culebra', 'answer': 'snake', 'm': '1' },
            { 'question': 'el oso', 'answer': 'bear', 'm': '1' },
            { 'question': 'la cebra', 'answer': 'zebra', 'm': '1' },
            { 'question': 'el búho', 'answer': 'owl', 'm': '1' },
            { 'question': 'la grulla', 'answer': 'crane', 'm': '1' },
            { 'question': 'la paloma', 'answer': 'dove', 'm': '1' },
            { 'question': 'el mono', 'answer': 'monkey', 'm': '1' },
            { 'question': 'la nutria', 'answer': 'otter', 'm': '1' }]
    })
    return jsonify({'message' : 'User created'})

# GET first question object and score of a logged in user
@app.route('/users/<username>', methods=['GET'])
def get_first_question(username):
    users = mongo.db.users

    q = users.find_one({'username' : username})
    output = {'score' : q['score'], 'question' : q['questions'][0]}

    return jsonify(output)

# GET user list
@app.route('/userlist', methods=['GET'])
def get_all_users():
    users = mongo.db.users
    userlist = []

    for q in users.find():
        userlist.append(q['username'])

    return jsonify(userlist)

# POST to retrieve next question
@app.route('/answer/<username>', methods=['POST'])
def get_next_question(username):
    users = mongo.db.users

    q = users.find_one({'username' : username})

    questions = q['questions']
    score = q['score']
    answer = request.json['answer']

    if answer == True :
        score += 10

    newQuestions = spacedRepAlgo(questions, answer)

    users.update({'username':username} , {'$set':{'score':score, 'questions':newQuestions}})

    output = {'score' : score, 'question' : q['questions'][0]}
    return jsonify(output)


# POST to create new question
@app.route('/question/<username>', methods=['POST'])
def create_new_question(username):
    users = mongo.db.users

    q = users.find_one({'username' : username})
    json = request.get_json()
    print(json)
    question = json['question']['question']
    answer = json['question']['answer']
    newQuestion = { 'question' : question, 'answer' : answer, 'm' : 1 }

    users.update({'username' : username}, { '$push' : { 'questions' : newQuestion }} )
    output = { 'questions' : newQuestion }
    return jsonify(output)

### running on localhost:8080 instead of cloud9
if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=8085)
