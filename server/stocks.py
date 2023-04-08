from yahoo_fin.stock_info import get_data, get_live_price
import pandas as pd
from datetime import date, timedelta


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

            data.append({"ticker": ticker,
                         "curr_Price": round(curr_price, 5),
                         "prev_price": round(prev_price, 2),
                         "change": round(change, 2),
                         "p_change": round(p_change, 2)})
    return data
