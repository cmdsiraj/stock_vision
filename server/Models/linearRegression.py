import math
import os
from sklearn.linear_model import LinearRegression
import numpy as np
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
plt.style.use('ggplot')

# temp_path = os.path.join(os.path.dirname(__file__), "../../temp")


def LIN_REG_ALGO(df, ticker):
    try:
        # No of days to be forcasted in future
        forecast_out = int(7)
        # Price after n days
        df['Close after n days'] = df['Close'].shift(-forecast_out)
        # New df with only relevant data
        df_new = df[['Close', 'Close after n days']]
        # Structure data for train, test & forecast
        # lables of known data, discard last 35 rows
        y = np.array(df_new.iloc[:-forecast_out, -1])
        y = np.reshape(y, (-1, 1))
        # all cols of known data except lables, discard last 35 rows
        X = np.array(df_new.iloc[:-forecast_out, 0:-1])
        # Unknown, X to be forecasted
        X_to_be_forecasted = np.array(df_new.iloc[-forecast_out:, 0:-1])

        # Traning, testing to plot graphs, check accuracy
        X_train = X[0:int(0.8*len(df)), :]
        X_test = X[int(0.8*len(df)):, :]
        y_train = y[0:int(0.8*len(df)), :]
        y_test = y[int(0.8*len(df)):, :]

        # Feature Scaling===Normalization
        sc = StandardScaler()
        X_train = sc.fit_transform(X_train)
        X_test = sc.transform(X_test)

        X_to_be_forecasted = sc.transform(X_to_be_forecasted)

        # Training
        clf = LinearRegression(n_jobs=-1)
        clf.fit(X_train, y_train)

        # Testing
        y_test_pred = clf.predict(X_test)
        y_test_pred = y_test_pred*(1.04)
        import matplotlib.pyplot as plt2
        fig = plt2.figure(figsize=(7.2, 4.8), dpi=65)
        plt2.plot(y_test, label='Actual Price')
        plt2.plot(y_test_pred, label='Predicted Price')

        plt2.legend(loc=4)
        image_path =  os.path.join(os.path.dirname(__file__), "../../temp/LR.png")
        plt2.savefig(image_path)
        plt2.close(fig)

        error_lr = math.sqrt(mean_squared_error(y_test, y_test_pred))

        # Forecasting
        forecast_set = clf.predict(X_to_be_forecasted)
        forecast_set = forecast_set*(1.04)
        mean = forecast_set.mean()
        lr_pred = forecast_set[0, 0]
        print()
        print(
            "##############################################################################")
        print("Tomorrow's ", ticker,
              " Closing Price Prediction by Linear Regression: ", lr_pred)
        print("Linear Regression RMSE:", error_lr)
        print(
            "##############################################################################")
        return lr_pred, forecast_set, mean, error_lr
    except Exception as e:
        print(e, " (LIN_REG_ALGO)")
