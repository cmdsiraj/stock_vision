from flask import Flask, request
from stocks import get_historical_data, get_today_data,get_current_day_stocks
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    {"message": "welcome"}


@app.route("/get_stock_data")
def get_historical():
    ticker = request.args.get('ticker')
    if ticker:
        data = get_historical_data(ticker)
        return data


@app.route("/get_today_data")
def get_today():
    tickers = request.args.get('tickers')
    tickers = tickers.split(",")
    # print(type(tickers))
    if (len(tickers) != 0):
        data = get_today_data(tickers)
        return data

@app.route("/get_table_display_data")
def get_table_display_data():
    data=get_current_day_stocks()
    return data

if __name__ == '__main__':
    app.run()
