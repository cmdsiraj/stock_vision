from datetime import datetime
import yfinance as yf
import pandas as pd
from Models.linearRegression import LIN_REG_ALGO
from Models.arima import ARIMA_algo
from Models.lstm import LSTM_ALGO
from Models.tweetsPolarity import get_tweets_polarity
from datetime import date, timedelta, datetime
import os
import json

# temp_path = os.path.join(os.path.dirname(__file__), '../temp')

# This function makes a csv file data stock data of each day for 3 years of a given ticker


def get_historical_data(ticker):
    print("Called Historical data")
    if datetime.now().strftime("%A") == "Monday":
        end = (date.today() - timedelta(days=4))
    elif datetime.now().strftime("%A") == "Sunday":
        end = (date.today() - timedelta(days=3))
    elif datetime.now().strftime("%A") == "Saturday":
        end = (date.today() - timedelta(days=2))
    elif datetime.now().strftime("%A") == "Friday":
        end = (date.today() - timedelta(days=1))
    else:
        end = datetime.now()

    start = datetime(end.year-3, end.month, end.day).strftime("%Y-%m-%d")
    end = end.strftime("%Y-%m-%d")
    try:
        data = yf.download(ticker, start=start, end=end, progress=False)
        df = pd.DataFrame(data=data)
        if not df.empty:
            file_name = ticker+".csv"
            csv_path = os.path.join(os.path.dirname(
                __file__), '../temp/'+file_name)
            df.to_csv(csv_path)
            print("Out from historical data - 1")
            return True
        else:
            print("Out from historical data - 2")
            return False
    except Exception as e:
        print("Out from historical data - 3")
        print("got error: ", e)
        return False


def recommending(ticker, global_polarity, today_stock, mean):
    if today_stock.iloc[-1]['Close'] < mean:
        if global_polarity > 0:
            idea = "RISE"
            decision = "BUY"
            print()
            print(
                "##############################################################################")
            print("According to the ML Predictions and Sentiment Analysis of Tweets, a",
                  idea, "in", ticker, "stock is expected => ", decision)
        elif global_polarity <= 0:
            idea = "FALL"
            decision = "SELL"
            print()
            print(
                "##############################################################################")
            print("According to the ML Predictions and Sentiment Analysis of Tweets, a",
                  idea, "in", ticker, "stock is expected => ", decision)
        else:
            idea = "FALL"
            decision = "SELL"
            print()
            print(
                "##############################################################################")
            print("According to the ML Predictions and Sentiment Analysis of Tweets, a",
                  idea, "in", ticker, "stock is expected => ", decision)
        return idea, decision


def get_stock_prediction(ticker):
   # we are loading the data from the csv that is created by get_historical() and preparing it to pass to our ML models
    # ticker = "AAPL"
    try:
        # we are calling this fun on a given ticker and making csv file of prev
        #  stock data
        get_historical_data(ticker)
    except Exception as e:
        print("Error in getting data (error from get_stock_prediction)")
        print("erroR: ", e)
    else:
        # load the csv file created in the prev call of get_history() and preparing it to pass to ML models
        try:
            file_name = ticker+".csv"
            file_path = os.path.join(os.path.dirname(
                __file__), '../temp/'+file_name)
            df = pd.read_csv(file_path)
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

            try:
                lstm_pred, error_lstm = LSTM_ALGO(df, ticker)
                lr_pred, forecast_set, mean, error_lr = LIN_REG_ALGO(
                    df, ticker)
                polarity, tw_list, tw_pol, pos, neg, neutral = get_tweets_polarity(
                    ticker)
                arima_pred, error_arima = ARIMA_algo(df, ticker)
            except Exception as e:
                print(e, " (calling Models)")

            try:
                idea, decision = recommending(
                    ticker, polarity, today_stock, mean)
                print()
                print("Forecasted Prices for Next 7 days:")
                print(forecast_set)
                today_stock = today_stock.round(2)
                file_name = ticker+".csv"
                csv_path = os.path.join(os.path.dirname(
                    __file__), '../temp/'+file_name)
                df.to_csv(csv_path)
                os.remove(csv_path)
            except Exception as e:
                print(e, " (Recomendations call and removing files)")

            try:
                print(len(tw_list))
                result = {"idea": idea, "prediction": decision}
                pricePredictions = {"ARIMA": str(round(arima_pred, 2)),
                                    "LSTM": str(round(lstm_pred, 2)), "linReg": str(round(lr_pred, 2))}
                rmse = {"ARIMA": str(round(error_arima, 2)),
                        "LSTM": str(round(error_lstm, 2)), "linReg": str(round(error_lr, 2))}
                tweets = {"list": tw_list, "overallPolarity": tw_pol}

                return {"ticker": ticker, "todayData": df.iloc[-1:].to_json(), "pricePredictions": pricePredictions,
                        "rmse": rmse, "result": result, "foreCast": forecast_set.tolist(), "tweets": tweets}
            except Exception as e:
                print(e, " (Retrun statement)")
                return {"Result": "Error", "Message": e}
