from flask import Flask
from stocks import get_current_stocks
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    {"message": "welcome"}


@app.route("/get_stock_data")
def get_stock_data():
    data = get_current_stocks()
    return data


if __name__ == '__main__':
    app.run()
