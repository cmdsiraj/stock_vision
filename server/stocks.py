import json
from yahoo_fin.stock_info import get_data, get_live_price
import pandas as pd
from datetime import date, timedelta, datetime


def get_historical_data(ticker, start_date="09-05-2013"):
    today = date.today().strftime("%m/%d/%Y")
    amazon = get_data(ticker, start_date=start_date,
                      end_date=today, index_as_date=True, interval="1d")
    df = pd.DataFrame()
    df['avg'] = (amazon['high'] + amazon['low'])/2

    dates = list()
    prices = list()
    data = list()

    for ts in df.index.tolist():
        dates.append(str(ts)[:-9])
    for p in df['avg']:
        prices.append(round(p, 5))

    for i in range(len(dates)):
        data.append({"date": dates[i], "price": prices[i]})

    return data


def get_today_data(tickers=list(), flag="limited"):
    # today = date.today().strftime("%m/%d/%Y")
    data = list()
    yesterday = (date.today() - timedelta(days=1)).strftime("%m/%d/%Y")
    if flag == "limited":
        for ticker in tickers:
            h_data = get_historical_data(ticker, yesterday)
            prev_price = h_data[0]["price"]
            curr_price = get_live_price(ticker)
            change = curr_price - prev_price
            p_change = (change/prev_price)*100

            print({"ticker": ticker,
                   "curr": round(curr_price, 5),
                   "prev": round(prev_price, 2),
                   "change": round(change, 2),
                   "p_change": round(p_change, 2)})

            data.append({"ticker": ticker,
                         "curr": round(curr_price, 5),
                         "change": round(change, 2),
                         "p_change": round(p_change, 2)})
    return data


def get_current_day_stocks():
    # ticker_list=['TSLA','NFLX','AMC','AI','GOOGL','AMD','MSFT','INTC','AAPL','AMZN','AUY','BAC','APE','NVDA','F']
    ticker_list=['TSLA','NFLX','GOOGL','AAPL','AMZN','NVDA','MSFT','AI','AMC','T','META','PFE']
    date=datetime.today()
    previous_date = date - timedelta(days=1)
    previous_date1 = str(previous_date.month)+"/" + \
        str(previous_date.day)+"/"+str(previous_date.year)
    days_before_date = date - timedelta(days=5)
    days_before_date1 = str(days_before_date.month)+"/" + \
        str(days_before_date.day)+"/"+str(days_before_date.year)
    data = list()

    # day_before_previous_date=previous_date-datetime.timedelta(days=1)
    # date1=str(date.month)+"/"+str(date.day)+"/"+str(date.year)
    # day_before_previous_date1=str(day_before_previous_date.month)+"/"+str(day_before_previous_date.day)+"/"+str(day_before_previous_date.year)

    for i in ticker_list:
        stock_data = get_data(
            i, start_date=days_before_date1, end_date=previous_date1)
        value = get_live_price(i)
        open = stock_data.iloc[-1].open
        high = stock_data.iloc[-1].high
        low = stock_data.iloc[-1].low
        prev = stock_data.iloc[-2].high
        data.append({
            "name": i, "value": value, "open": open, "high": high, "low": low, "prev": prev,
        })
    return json.dumps(data)
