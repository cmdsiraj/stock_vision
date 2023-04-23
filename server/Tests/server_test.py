import unittest
from unittest.mock import MagicMock
import sys
from os.path import abspath, join, dirname

parent_dir = abspath(join(dirname(__file__), '..'))
sys.path.insert(0, parent_dir)

from server import app


class TestApp(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_home(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"message": "welcome"})

    def test_get_historical(self):
        response = self.app.get('/get_stock_data?ticker=AAPL')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)

    def test_get_today(self):
        response = self.app.get('/get_today_data?tickers=AAPL,AMZN,GOOGL')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)

    def test_get_table_display_data(self):
        response = self.app.get('/get_table_display_data')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)

    def test_get_prediction(self):
        response = self.app.get('/get_prediction?ticker=AAPL')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, dict)


if __name__ == '__main__':
    unittest.main()
    print("All Tests are passed")