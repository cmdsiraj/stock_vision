from flask import Flask, request, jsonify
from stocks import get_historical_data, get_today_data, get_current_day_stocks
from flask_cors import CORS
from getPrediction import get_stock_prediction
import requests
import csv
from Models.tweetsPolarity import get_tweets_polarity

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return {"message": "welcome"}


# @app.route("/tweets_polarity")
# def tweets_polarity():
#     ticker = request.args.get('ticker')
#     if ticker:
#         global_polarity, tw_list, tw_pol, pos, neg, neutral = get_tweets_polarity(ticker)
#         print("Got data")
#         return {"global_polarity": global_polarity, "tw_list": tw_list, "tw_pol": tw_pol, "pos": pos, "neg": neg, "neutral": neutral}
#     else:
#         return {"status": "error", "Message": "Please enter a ticker value"}


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
