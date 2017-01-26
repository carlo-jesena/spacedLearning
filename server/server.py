from flask import Flask, jsonify, request
from flask_pymongo import PyMongo

app = Flask(__name__)



@app.route("/hello")
def say_hi():
    return "Hello World!"



### running on localhost:8080 instead of cloud9
if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=8080)
