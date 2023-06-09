from flask import Flask, request, jsonify
from stocks import get_historical_data, get_today_data, get_current_day_stocks
from flask_cors import CORS
from getPrediction import get_stock_prediction
import requests
import csv

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return {"message": "welcome"}


@app.route("/get_stock_data")
def get_historical():
    ticker = request.args.get('ticker')
    if ticker:
        data = get_historical_data(ticker)
        return data


@app.route("/get_today_data")
def get_today():
    tickers = request.args.get('tickers')
    print(tickers)
    tickers = tickers.split(",")
    # print(type(tickers))
    if (len(tickers) != 0):
        data = get_today_data(tickers)
        return data


@app.route("/get_table_display_data")
def get_table_display_data():
    data = get_current_day_stocks()
    return data


@app.route("/get_prediction")
def get_prediction():
    ticker = request.args.get('ticker')
    # print(ticker)
    # print(type(ticker))
    prediction = get_stock_prediction(ticker.strip())
    # print(prediction)
    return prediction


if __name__ == '__main__':
    app.run(threaded=False)
