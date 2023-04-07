from yahoo_fin.stock_info import get_data
import pandas as pd


def get_current_stocks():
    amazon = get_data('amzn', start_date="05-09-2013",
                      end_date="07-04-2023", index_as_date=True, interval="1wk")
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
