import os
import re
import yfinance as yf
from textblob import TextBlob
import snscrape.modules.twitter as sntwitter
from datetime import datetime
import pandas as pd
import matplotlib.pyplot as plt
plt.style.use('ggplot')

# temp_path = os.path.join(os.path.dirname(__file__), '../../temp')


def cleanTweets(text):
    text = re.sub('@[A-Za-z0-9_]+', '', text)  # removes @mentions
    text = re.sub('#', '', text)  # removes hastag '#' symbol
    text = re.sub('RT[\s]+', '', text)
    text = re.sub('https?:\/\/\S+', '', text)
    text = re.sub('\n', ' ', text)
    return text


def get_start_and_end_date():
    end = datetime.now()
    if end.day == 1:
        day = 30
        if end.month == 1:
            month = 12
            year = end.year-1
        else:
            month = end.month-1
            year = end.year
    else:
        day = end.day-1
        month = end.month
        year = end.year

    start = datetime(year, month, day)

    return str(start)[:10], str(end)[:10]


def get_tweets_polarity(ticker):
    try:
        try:
            file_path = os.path.join(os.path.dirname(
                __file__), "../../temp/Yahoo-Finance-Ticker-Symbols.csv")
            stock_ticker_map = pd.read_csv(file_path)
            stock_full_form = stock_ticker_map[stock_ticker_map['Ticker'] == ticker]
            symbol = stock_full_form['Name'].to_list()[0][0:12]
        except:
            info = yf.Ticker(ticker).info
            symbol = info['longName']
        print(symbol)

        start, end = get_start_and_end_date()

        # Creating list to append tweet data to
        tweets_list = []

        # Using TwitterSearchScraper to scrape data and append tweets to list
        query = symbol+" since:"+str(start)[:10]+" until:"+str(end)[:10]
        print(query)
        for i, tweet in enumerate(sntwitter.TwitterSearchScraper(f'{symbol} since:{start} until:{end}').get_items()):
            if i > 300:
                break
            tweets_list.append(tweet.content)

            print(len(tweets_list))
            count = 20
            tweet_list = []  # List of tweets alongside polarity
            global_polarity = 0  # Polarity of all tweets === Sum of polarities of individual tweets
            tw_list = []  # List of tweets only => to be displayed on web page
            # Count Positive, Negative to plot pie chart
            pos = 0  # Num of pos tweets
            neg = 1

            for tweet in tweets_list:
                polarity = 0
                tw = cleanTweets(tweet)
                polarity = TextBlob(tw).sentiment.polarity
                if polarity > 0:
                    pos += 1
                elif polarity < 0:
                    neg += 1

                global_polarity += polarity
                tweet_list.append((tweet, polarity))

                if count > 0:
                    print(count)
                    print(tw_list)
                    tw_list.append(tweet)
                    count = count - 1
                print(count)
            if len(tweet_list) != 0:
                global_polarity = global_polarity / len(tweet_list)
            else:
                global_polarity = global_polarity

            neutral = 300-pos-neg
            if neutral < 0:
                neg = neg+neutral
                neutral = 20
            print()
            print(
                "##############################################################################")
            print("Positive Tweets :", pos, "Negative Tweets :",
                  neg, "Neutral Tweets :", neutral)
            print(
                "##############################################################################")
            labels = ['Positive', 'Negative', 'Neutral']
            sizes = [pos, neg, neutral]
            explode = (0, 0, 0)
            fig = plt.figure(figsize=(7.2, 4.8), dpi=65)
            fig1, ax1 = plt.subplots(figsize=(7.2, 4.8), dpi=65)
            ax1.pie(sizes, explode=explode, labels=labels,
                    autopct='%1.1f%%', startangle=90)
            # Equal aspect ratio ensures that pie is drawn as a circle
            ax1.axis('equal')
            plt.tight_layout()
            image_path = os.path.join(
                os.path.dirname(__file__), "../../temp/SA.png")
            plt.savefig(image_path)
            plt.close(fig)

            if global_polarity > 0:
                print()
                print(
                    "##############################################################################")
                print("Tweets Polarity: Overall Positive")
                print(
                    "##############################################################################")
                tw_pol = "Overall Positive"
            else:
                print()
                print(
                    "##############################################################################")
                print("Tweets Polarity: Overall Negative")
                print(
                    "##############################################################################")
                tw_pol = "Overall Negative"
                print(tw_list)
            return global_polarity, tw_list, tw_pol, pos, neg, neutral
    except Exception as e:
        print(e, "(get_tweets_polarity)")
