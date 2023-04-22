import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import StockChartRow from "../components/StockChartRow";

describe("StockChartRow", () => {
  const data = {
    ticker: "AAPL",
    curr: "USD",
    change: 10,
    p_change: 1.5,
  };

  test("renders the stock data correctly", () => {
    render(<StockChartRow data={data} />);
    expect(screen.getByText(data.ticker)).toBeInTheDocument();
    expect(screen.getByText(data.curr)).toBeInTheDocument();
    expect(screen.getByText(`${data.change}`)).toBeInTheDocument();
    expect(screen.getByText(`${data.p_change}%`)).toBeInTheDocument();
  });

  test("calls the onClickFunction when clicked", () => {
    const onClickMock = jest.fn();
    render(<StockChartRow data={data} onClickFunction={onClickMock} />);
    fireEvent.click(screen.getByText(data.ticker));
    expect(onClickMock).toHaveBeenCalled();
  });
});
