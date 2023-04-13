import requests
import csv
import json
import yfinance as yf
import pandas as pd
from yahoo_fin.stock_info import get_data, get_live_price
import pandas as pd
from datetime import date, timedelta, datetime


def get_historical_data(ticker, start_date="2013-09-05", output="list"):
    if datetime.now().strftime("%A") == "Monday":
        end = (date.today() - timedelta(days=4)).strftime("%Y-%m-%d")
    elif datetime.now().strftime("%A") == "Sunday":
        end = (date.today() - timedelta(days=3)).strftime("%Y-%m-%d")
    elif datetime.now().strftime("%A") == "Saturday":
        end = (date.today() - timedelta(days=2)).strftime("%Y-%m-%d")
    elif datetime.now().strftime("%A") == "Friday":
        end = (date.today() - timedelta(days=1)).strftime("%Y-%m-%d")
    else:
        end = datetime.now()

    if output == "list":
        data = yf.download(ticker, start=start_date, end=end, progress=False)
        data = pd.DataFrame(data=data)
        # print(data.head())
        df = pd.DataFrame()
        df['avg'] = (data['High'] + data['Low'])/2

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

    elif output == "csv":
        start = datetime(end.year-3, end.month, end.day)
        try:
            data = yf.download(ticker, start=start, end=end, progress=False)
            df = pd.DataFrame(data=data)
            if not df.empty:
                df.to_csv('./temp/'+ticker+'.csv')
                return True
            else:
                return False
        except Exception as e:
            print("got error: ", e)
            return False


def get_today_data(tickers=list(), flag="limited"):
    # today = date.today().strftime("%m/%d/%Y")
    data = list()
    yesterday = (date.today() - timedelta(days=1)).strftime("%Y-%m-%d")
    if flag == "limited":
        for ticker in tickers:
            h_data = get_historical_data(ticker, yesterday)
            print("fetched data of: "+ticker)
            prev_price = h_data[0]["price"]
            curr_price = get_live_price(ticker)
            change = curr_price - prev_price
            p_change = (change/prev_price)*100

            # print({"ticker": ticker,
            #        "curr": round(curr_price, 5),
            #        "prev": round(prev_price, 2),
            #        "change": round(change, 2),
            #        "p_change": round(p_change, 2)})

            data.append({"ticker": ticker,
                         "curr": round(curr_price, 3),
                         "change": round(change, 2),
                         "p_change": round(p_change, 2)})
    return data


def get_current_day_stocks():
    # ticker_list=['TSLA','NFLX','AMC','AI','GOOGL','AMD','MSFT','INTC','AAPL','AMZN','AUY','BAC','APE','NVDA','F']
    ticker_list=['TSLA','NFLX','GOOGL','AAPL','AMZN','NVDA','MSFT','AI','AMC','T','META','PFE','BBD','FRC','NIO','VZ','MU','DNA','WBD','LEVI','KEY']
    current_date=date.today().strftime("%m/%d/%Y")
    previous_date = (date.today() - timedelta(days=5)).strftime("%m/%d/%Y")
    data = list()
    for i in ticker_list:
        stock_data = get_data(
            i, start_date=previous_date, end_date=current_date)
        data.append({
            "name": i, "value": get_live_price(i), "open": stock_data.iloc[-1].open, "high": stock_data.iloc[-1].high, "low": stock_data.iloc[-1].low, "prev": stock_data.iloc[-2].high,
        })
    return json.dumps(data)


# key = '26NVD1ND5SCLCG70'


# previous price = 'close'
#['time', 'open', 'high', 'low', 'close', 'volume']
# def prev_data(code):
#     CSV_URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=' + \
#         code+'&interval=15min&slice=year1month1&apikey='+key

#     with requests.Session() as s:
#         download = s.get(CSV_URL)
#         decoded_content = download.content.decode('utf-8')
#         cr = csv.reader(decoded_content.splitlines(), delimiter=',')
#         my_list = list(cr)
#         price_dict = {}
#         for row in my_list:
#             price_dict[row[0]] = row[4]
#         return price_dict


# def present_price(code):
#     url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+code+"&apikey="+key
#     response = requests.get(url)
#     data = response.json()
#     # print(data)
#     return data
# # format of present price return value
# # {'Global Quote': {'01. symbol': 'IBM',
# #   '02. open': '132.1600',
# #   '03. high': '132.6000',
# #   '04. low': '130.3150',
# #   '05. price': '130.5000',
# #   '06. volume': '3050581',
# #   '07. latest trading day': '2023-04-06',
# #   '08. previous close': '132.1400',
# #   '09. change': '-1.6400',
# #   '10. change percent': '-1.2411%'}}


# def get_ticker_dict(tickers=list()):
#     data = []
#     # today = date.today()
#     # yesterday=date(today.year, today.month, today.day - 1)
#     for i in tickers:
#         ticker_data = present_price(i)['Global Quote']
#         prev_price = ticker_data['08. previous close']
#         curr_price = ticker_data['05. price']
#         change = ticker_data['09. change']
#         p_change = ticker_data['10. change percent']
#         data.append({"ticker": i, "curr_Price": curr_price,
#                     "change": change, "p_change": p_change})
#     return data
