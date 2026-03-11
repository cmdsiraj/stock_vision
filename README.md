# 📈 Stock Vision

**Stock Vision** is a full-stack web application that predicts stock prices using machine learning and sentiment analysis. It combines three ML algorithms with real-time market data and Twitter sentiment analysis to deliver stock forecasts and actionable BUY/SELL recommendations.

---

## 🚀 What Stock Vision Can Do

### 1. Stock Price Prediction
Enter any stock ticker symbol and Stock Vision runs three independent machine-learning models to forecast the next price move:

| Model | Algorithm | Description |
|-------|-----------|-------------|
| **LSTM** | Deep Learning (TensorFlow/Keras) | 4-layer LSTM neural network trained on historical close prices; captures long-range temporal patterns |
| **Linear Regression** | Supervised ML (scikit-learn) | Trend-based forward prediction with StandardScaler normalization; generates a 7-day price forecast array |
| **ARIMA** | Time-Series Statistics (statsmodels) | `ARIMA(5,1,0)` walk-forward model; robust to non-stationary financial data |

Each model outputs:
- Next-day price prediction
- Root Mean Square Error (RMSE) on test data
- A comparison chart image (actual vs. predicted)

### 2. Sentiment Analysis
- Analyzes tweets about the queried stock ticker using **TextBlob** NLP
- Classifies each tweet as Positive, Negative, or Neutral
- Computes an overall polarity score (−1 to +1)
- Generates a pie chart showing sentiment distribution

### 3. BUY / SELL Recommendation
Combines the average of the three model forecasts with tweet sentiment:
- Predicted price **above** current + positive sentiment → **RISE / BUY**
- Predicted price **below** current + negative sentiment → **FALL / SELL**

### 4. Live Price Dashboard
Tracks 20 major stocks in real time (Tesla, Apple, Microsoft, Google, Amazon, NVIDIA, Meta, Netflix, and more), displaying:
- Current price
- Open / High / Low / Previous close
- Intraday price change and % change

### 5. Historical Price Charts
Interactive Highcharts/Highstock line charts showing up to 10+ years of historical close prices for any ticker.

### 6. 7-Day Price Forecast
A forward-looking price forecast array produced by the Linear Regression model for the next seven trading days.

### 7. Currency Converter
Built-in currency conversion utility for quick reference.

### 8. News Feed
Latest business and technology headlines fetched from NewsAPI.org, displayed as formatted news cards.

---

## 🏗️ Architecture

```
stock_vision/
│
├── src/                        # React 18 frontend
│   ├── App.js                  # Route definitions
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── StockPrediction.jsx # Main prediction UI
│   │   ├── LivePrices.jsx      # Real-time price dashboard
│   │   ├── Converter.jsx       # Currency converter
│   │   └── News.jsx            # News feed
│   └── components/             # 18 reusable UI components
│       ├── SearchBar.jsx
│       ├── StockChart.jsx       # Highcharts historical chart
│       ├── ValuePredictionCard.jsx
│       ├── Tweets.jsx
│       ├── TodayStockReadings.jsx
│       ├── RmsImages.jsx
│       ├── ResultFooterImages.jsx
│       ├── StockChartRow.jsx
│       ├── stockTable.jsx / stockRow.jsx
│       ├── SideChart.jsx
│       ├── Navbar.jsx
│       ├── LoadingScreen.jsx
│       ├── NewsCard.jsx
│       └── CurrencyInput.jsx
│
└── server/                     # Python Flask backend
    ├── server.py               # API routes
    ├── stocks.py               # yfinance data fetching
    ├── getPrediction.py        # ML pipeline orchestration
    ├── Models/
    │   ├── lstm.py             # LSTM neural network
    │   ├── linearRegression.py # Linear regression model
    │   ├── arima.py            # ARIMA time-series model
    │   └── tweetsPolarity.py   # Sentiment analysis
    ├── requirements.txt
    └── Tests/
        └── server_test.py
```

---

## 🔌 API Endpoints

| Method | Endpoint | Query Params | Description |
|--------|----------|--------------|-------------|
| GET | `/` | — | Health check → `{"message": "welcome"}` |
| GET | `/get_stock_data` | `ticker=AAPL` | Historical close price data |
| GET | `/get_today_data` | `tickers=AAPL,MSFT` | Intraday price changes |
| GET | `/get_table_display_data` | — | Pre-configured 20-stock dashboard data |
| GET | `/get_prediction` | `ticker=AAPL` | Full ML prediction pipeline result |

**Prediction response shape:**
```json
{
  "ticker": "AAPL",
  "todayData": { "Open": 0, "High": 0, "Low": 0, "Close": 0, "Volume": 0 },
  "pricePredictions": { "ARIMA": 0, "LSTM": 0, "linReg": 0 },
  "rmse": { "ARIMA": 0, "LSTM": 0, "linReg": 0 },
  "result": { "idea": "BUY", "prediction": "RISE" },
  "foreCast": [0, 0, 0, 0, 0, 0, 0],
  "tweets": { "list": [], "overallPolarity": "Overall Positive" }
}
```

---

## 🛠️ Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| React Router DOM | 6 | Client-side routing |
| Tailwind CSS | 3.3.1 | Utility-first styling |
| Highcharts / Highstock | 10.3.3 | Interactive financial charts |
| Plotly.js | 2.20.0 | Additional visualizations |
| D3.js | 7.8.4 | Advanced data graphics |
| Axios | 1.3.6 | HTTP requests to backend |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Flask | 2.2.3 | REST API server |
| Flask-CORS | 3.0.10 | Cross-origin resource sharing |
| TensorFlow / Keras | 2.12.0 | LSTM neural network |
| scikit-learn | 1.2.2 | Linear regression & preprocessing |
| statsmodels | 0.13.5 | ARIMA time-series model |
| pandas | 2.0.0 | Data manipulation |
| yfinance | 0.2.17 | Yahoo Finance stock data |
| TextBlob | 0.17.1 | Tweet sentiment analysis |
| spaCy | 3.5.1 | NLP processing |
| NLTK | 3.8.1 | Natural language toolkit |
| snscrape | 0.6.2 | Twitter data scraping |
| Matplotlib | 3.7.1 | Model chart generation |

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js** 14 or later
- **Python** 3.7 or later

### Frontend

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm start

# Run frontend tests
npm test

# Build for production
npm run build
```

### Backend

```bash
# Install Python dependencies
pip install -r server/requirements.txt

# Start Flask server (http://localhost:5000)
cd server
python server.py

# Run backend tests
python -m unittest Tests.server_test
```

---

## 🧪 Testing

| Layer | Tool | Command |
|-------|------|---------|
| Frontend | Jest + Enzyme | `npm test` |
| Backend | Python unittest | `python -m unittest Tests.server_test` |

Backend tests cover all five Flask API endpoints.

---

## 📊 Tracked Stocks (Live Dashboard)

The live prices dashboard tracks these 20 stocks by default:

`TSLA` · `NFLX` · `GOOG` · `AAPL` · `AMZN` · `NVDA` · `MSFT` · `AI` · `AMC` · `T` · `META` · `PFE` · `BBD` · `FRC` · `NIO` · `VZ` · `MU` · `DNA` · `WBD` · `LEVI`

---

## 📄 License

See the [LICENSE](LICENSE) file for details.
