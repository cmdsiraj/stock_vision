import json
from yahoo_fin.stock_info import get_data, get_live_price
import pandas as pd
from datetime import date, timedelta, datetime


def get_historical_data(ticker, start_date="09-05-2013"):
    today = date.today().strftime("%m/%d/%Y")
    amazon = get_data(ticker, start_date=start_date,
                      end_date=today, index_as_date=True, interval="1mo")
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










from alpha_vantage.timeseries import TimeSeries
import csv
import requests

key='26NVD1ND5SCLCG70'


#previous price = 'close'
#['time', 'open', 'high', 'low', 'close', 'volume']
def prev_data(code):
    CSV_URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol='+code+'&interval=15min&slice=year1month1&apikey='+key

    with requests.Session() as s:
        download = s.get(CSV_URL)
        decoded_content = download.content.decode('utf-8')
        cr = csv.reader(decoded_content.splitlines(), delimiter=',')
        my_list = list(cr)
        price_dict={}
        for row in my_list:
            price_dict[row[0]]=row[4]
        return price_dict



def present_price(code):
    url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+code+"&apikey="+key
    response = requests.get(url)
    data = response.json()
    # print(data)
    return data
#format of present price return value
# {'Global Quote': {'01. symbol': 'IBM',
#   '02. open': '132.1600',
#   '03. high': '132.6000',
#   '04. low': '130.3150',
#   '05. price': '130.5000',
#   '06. volume': '3050581',
#   '07. latest trading day': '2023-04-06',
#   '08. previous close': '132.1400',
#   '09. change': '-1.6400',
#   '10. change percent': '-1.2411%'}}

def get_ticker_dict(tickers=list()):
    data= []
    # today = date.today()
    # yesterday=date(today.year, today.month, today.day - 1)
    for i in tickers:
        ticker_data=present_price(i)['Global Quote']
        prev_price = ticker_data['08. previous close']
        curr_price = ticker_data['05. price']
        change = ticker_data['09. change']
        p_change = ticker_data['10. change percent']
        data.append({"ticker": i,"curr_Price": curr_price,"change": change,"p_change": p_change})
    return data
