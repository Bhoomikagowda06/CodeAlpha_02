# 📊 Stock Portfolio Tracker

A simple Python-based **Stock Portfolio Tracker** that calculates the total investment value based on the stock names and quantities entered by the user.

## 🎯 Objective

The objective of this project is to create a simple stock tracker that:

* Accepts stock names and quantities from the user
* Uses predefined stock prices
* Calculates the total investment value
* Displays the portfolio summary
* Optionally saves the portfolio details to a text file

## 🛠️ Technologies Used

* **Python**
* **Dictionary**
* **File Handling**
* **User Input**

## 📌 Features

* Enter multiple stock names
* Enter the quantity of each stock
* Uses a predefined stock price dictionary
* Calculates total investment automatically
* Displays the portfolio details
* Saves the result to a file

## 💰 Sample Stock Prices

The project uses manually defined stock prices such as:

```python
stock_prices = {
    "AAPL": 180,
    "TSLA": 250,
    "GOOGL": 140,
    "MSFT": 400
}
```

> Note: These prices are only sample values and are not real-time market prices.

## ▶️ How to Run

### 1. Clone the repository

```bash
git clone https://github.com/Bhoomikagowda06/Stock-Portfolio-Tracker.git
```

### 2. Open the project folder

```bash
cd Stock-Portfolio-Tracker
```

### 3. Run the Python program

```bash
python stock_portfolio_tracker.py
```

## 🧮 How It Works

The program calculates the investment value using:

```text
Investment Value = Stock Price × Quantity
```

The total portfolio value is calculated by adding the investment value of all entered stocks.

## 📂 Project Structure

```text
Stock-Portfolio-Tracker/
│
├── stock_portfolio_tracker.py
├── portfolio.txt
└── README.md
```

## 📷 Example

```text
Enter stock name: AAPL
Enter quantity: 5

AAPL - Price: $180 × 5 = $900

Total Investment: $900
```

## 🚀 Future Enhancements

* Add real-time stock prices using an API
* Add more stocks
* Create a graphical user interface
* Add portfolio performance tracking
* Store portfolio data in a database

## 👩‍💻 Author

**Bhoomika H S**

GitHub: [Bhoomikagowda06](https://github.com/Bhoomikagowda06)
