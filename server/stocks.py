import json
import yfinance as yf
import pandas as pd
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
        try:
            data = yf.download(ticker, start=start_date,
                               end=end, progress=False)
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
        except Exception as e:
            print("error in getting data(historical) "+ticker)
            print(e)
            print()

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
            print("got error(historical): ", e)
            return False


def get_today_data(tickers=list(), flag="limited"):

    if datetime.now().strftime("%A") == "Monday":
        # end = (date.today() - timedelta(days=4)).strftime("%Y-%m-%d")
        start = (date.today() - timedelta(days=5)).strftime("%Y-%m-%d")
    elif datetime.now().strftime("%A") == "Sunday":
        # end = (date.today() - timedelta(days=3)).strftime("%Y-%m-%d")
        start = (date.today() - timedelta(days=4)).strftime("%Y-%m-%d")
    elif datetime.now().strftime("%A") == "Saturday":
        # end = (date.today() - timedelta(days=2)).strftime("%Y-%m-%d")
        start = (date.today() - timedelta(days=3)).strftime("%Y-%m-%d")
    elif datetime.now().strftime("%A") == "Friday":
        # end = (date.today() - timedelta(days=1)).strftime("%Y-%m-%d")
        start = (date.today() - timedelta(days=2)).strftime("%Y-%m-%d")
    else:
        # end = datetime.now()
        start = (date.today() - timedelta(days=1)).strftime("%Y-%m-%d")

    # today = date.today().strftime("%m/%d/%Y")
    data = list()
    # curData
    if flag == "limited":
        for ticker in tickers:
            try:
                h_data = get_historical_data(ticker, start)
                print("fetched data of: "+ticker)
                prev_price = h_data[0]["price"]
                curr_price = yf.download(
                    ticker, start, date.today().strftime("%Y-%m-%d")).iloc[-1]['Close']
                # print(type(curr_price))
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
            except Exception as e:
                print(e)
                print("Error in getting "+ticker)
                print()
    return data


def get_current_day_stocks():
    # ticker_list=['TSLA']
    ticker_list = ['TSLA', 'NFLX', 'GOOG', 'AAPL', 'AMZN', 'NVDA', 'MSFT', 'AI', 'AMC',
                   'T', 'META', 'PFE', 'BBD', 'FRC', 'NIO', 'VZ', 'MU', 'DNA', 'WBD', 'LEVI']
    # if datetime.now().strftime("%A") == "Monday":
    #     # end = (date.today() - timedelta(days=4)).strftime("%Y-%m-%d")
    #     start = (date.today() - timedelta(days=5)).strftime("%Y-%m-%d")
    # elif datetime.now().strftime("%A") == "Sunday":
    #     # end = (date.today() - timedelta(days=3)).strftime("%Y-%m-%d")
    #     start = (date.today() - timedelta(days=4)).strftime("%Y-%m-%d")
    # elif datetime.now().strftime("%A") == "Saturday":
    #     # end = (date.today() - timedelta(days=2)).strftime("%Y-%m-%d")
    #     start = (date.today() - timedelta(days=3)).strftime("%Y-%m-%d")
    # elif datetime.now().strftime("%A") == "Friday":
    #     # end = (date.today() - timedelta(days=1)).strftime("%Y-%m-%d")
    #     start = (date.today() - timedelta(days=2)).strftime("%Y-%m-%d")
    # else:
    #     # end = datetime.now()
    start = (date.today() - timedelta(days=2)).strftime("%Y-%m-%d")
    end = date.today().strftime("%Y-%m-%d")
    print(end)
    print(start)
    data = list()
    for i in ticker_list:
        # ticker = yf.Ticker(i)
        try:
            stock_data = yf.download(i, start=start, end=end)
            stock_data = pd.DataFrame(data=stock_data)
            print(stock_data)
            data.append({"name": i, "value": stock_data.iloc[-1]['Close'], "open": stock_data.iloc[-1]['Open'],
                         "high": stock_data.iloc[-1]['High'], "low": stock_data.iloc[-1]['Low'], "prev": stock_data.iloc[-2]['Close']})
        except Exception as e:
            print(e)
            print("error in getting "+i)
            print()
    return data
