from flask import Flask, request, jsonify
from flask_cors import CORS
from routes.predict import predict_route

app = Flask(__name__)

CORS(app)
app.register_blueprint(predict_route)
@app.route('/')

def home():

    return "Backend Running"


if __name__ == '__main__':

    app.run(debug=True)