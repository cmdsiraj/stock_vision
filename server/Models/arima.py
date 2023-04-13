from datetime import datetime
import math
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error
import matplotlib.pyplot as plt
plt.style.use('ggplot')


def ARIMA_algo(df):
    uniqueVals = df["Code"].unique()
    len(uniqueVals)
    df = df.set_index("Code")

    def arima_model(train, test):
        history = [x for x in train]
        predictions = list()
        # walk-forward validation
        for t in range(len(test)):
            model = ARIMA(history, order=(5, 1, 0))
            model_fit = model.fit()
            output = model_fit.forecast()
            yhat = output[0]
            predictions.append(yhat)
            obs = test[t]
            history.append(obs)
        return predictions

    def parser(x):
        return datetime.strptime(x, '%Y-%m-%d')
    for company in uniqueVals[:10]:
        data = (df.loc[company, :]).reset_index()
        data['Price'] = data['Close']
        Quantity_date = data[['Price', 'Date']]
        Quantity_date.index = Quantity_date['Date'].map(lambda x: parser(x))
        Quantity_date['Price'] = Quantity_date['Price'].map(lambda x: float(x))
        Quantity_date = Quantity_date.fillna(Quantity_date.bfill())
        Quantity_date = Quantity_date.drop(['Date'], axis=1)
        fig = plt.figure(figsize=(7.2, 4.8), dpi=65)
        plt.plot(Quantity_date)
        plt.savefig('Trends.png')
        plt.close(fig)

        quantity = Quantity_date.values
        size = int(len(quantity) * 0.80)
        train, test = quantity[0:size], quantity[size:len(quantity)]
        #fit in model
        predictions = arima_model(train, test)

        fig = plt.figure(figsize=(7.2, 4.8), dpi=65)
        plt.plot(test, label='Actual Price')
        plt.plot(predictions, label='Predicted Price')
        plt.legend(loc=4)
        plt.savefig('ARIMA.png')
        plt.close(fig)
        arima_pred = predictions[-2]
        print("Tomorrow's", quote, " Closing Price Prediction by ARIMA:", arima_pred)
        # rmse calculation
        error_arima = math.sqrt(mean_squared_error(test, predictions))
        print("ARIMA RMSE:", error_arima)
        return arima_pred, error_arima
