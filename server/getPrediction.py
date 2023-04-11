from alpha_vantage.timeseries import TimeSeries
from datetime import datetime
import yfinance as yf
import pandas as pd
from Models.linearRegression import LIN_REG_ALGO
from Models.lstm import LSTM_ALGO
from Models.tweetsPolarity import get_tweets_polarity

# This function makes a csv file data stock data of each day for 3 years of a given ticker


def get_historical(quote):
    end = datetime.now()
    start = datetime(end.year-3, end.month, end.day)
    try:
        data = yf.download(quote, start=start, end=end)
        df = pd.DataFrame(data=data)
        print(df.empty)
        if not df.empty:
            df.to_csv(''+quote+'.csv')
            return True
        else:
            print("Here")
            ts = TimeSeries(key='N6A6QT6IBFJOPJ70', output_format='pandas')
            data, meta_data = ts.get_daily_adjusted(
                symbol='NSE:'+quote, outputsize='full')
            print(data)
            # Format df
            # Last 3 yrs rows => 502, in ascending order => ::-1
            data = data.head(754).iloc[::-1]
            data = data.reset_index()
            # Keep Required cols only
            df = pd.DataFrame()
            df['Date'] = data['date']
            df['Open'] = data['1. open']
            df['High'] = data['2. high']
            df['Low'] = data['3. low']
            df['Close'] = data['4. close']
            df['Adj Close'] = data['5. adjusted close']
            df['Volume'] = data['6. volume']
            df.to_csv(''+quote+'.csv', index=False)
            return True
    except Exception as e:
        print("got error: ", e)
        return False


def recommending(df, global_polarity, today_stock, mean):
    if today_stock.iloc[-1]['Close'] < mean:
        if global_polarity > 0:
            idea = "RISE"
            decision = "BUY"
            print()
            print(
                "##############################################################################")
            print("According to the ML Predictions and Sentiment Analysis of Tweets, a",
                  idea, "in", quote, "stock is expected => ", decision)
        elif global_polarity <= 0:
            idea = "FALL"
            decision = "SELL"
            print()
            print(
                "##############################################################################")
            print("According to the ML Predictions and Sentiment Analysis of Tweets, a",
                  idea, "in", quote, "stock is expected => ", decision)
        else:
            idea = "FALL"
            decision = "SELL"
            print()
            print(
                "##############################################################################")
            print("According to the ML Predictions and Sentiment Analysis of Tweets, a",
                  idea, "in", quote, "stock is expected => ", decision)
        return idea, decision


def get_stock_prediction(ticker):
   # we are loading the data from the csv that is created by get_historical() and preparing it to pass to our ML models
    # ticker = "AAPL"
    try:
        # we are calling this fun on a given ticker and making csv file of prev
        #  stock data
        get_historical(ticker)
    except:
        print("Error in getting data")
    else:
        # load the csv file created in the prev call of get_history() and preparing it to pass to ML models
        try:
            df = pd.read_csv(''+ticker+".csv")
        except:
            print("Error in locating data")
            return {"Message": "Error in locating file"}
        else:
            print("#############################################################")
            print("Today's ", ticker, " stock_data: ")
            today_stock = df.iloc[-1:]
            print(today_stock)
            print("#############################################################")
            # droping the rows that contains null values
            df.dropna()
            code_list = [ticker]*len(df)
            df2 = pd.DataFrame(code_list, columns=['code'])
            df2 = pd.concat([df2, df], axis=1)
            df = df2
            # print(df.head())

            lstm_pred, error_lstm = LSTM_ALGO(df, ticker)
            df, lr_pred, forecast_set, mean, error_lr = LIN_REG_ALGO(df)
            polarity, tw_list, tw_pol, pos, neg, neutral = retrieving_tweets_polarity(ticker)

            idea, decision = recommending(df, polarity, today_stock, mean)
            print()
            print("Forecasted Prices for Next 7 days:")
            print(forecast_set)
            today_stock = today_stock.round(2)
            return {"idea": idea, "prediction": decision}
