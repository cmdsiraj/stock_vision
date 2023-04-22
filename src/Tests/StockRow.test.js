import React from "react";
import { render, screen } from "@testing-library/react";

import StockRow from "../components/StockRow";

describe("StockRow", () => {
  test("Renders Stock Information correctly", () => {
    const stock = {
      name: "AAPL",
      value: 120.345,
      prev: 120.123,
      open: 120.12,
      high: 120.51,
      low: 110.95,
    };

    render(<StockRow {...stock} />);

    expect(screen.getByTestId("StockName")).toHaveTextContent("AAPL");
    expect(screen.getByTestId("StockValue")).toHaveTextContent("120.34");
    expect(screen.getByTestId("StockValueChange")).toHaveTextContent("0.22");
    expect(screen.getByTestId("StockValuePercentageChange")).toHaveTextContent(
      "0.18%"
    );
    expect(screen.getByTestId("StockOpen")).toHaveTextContent("120.12");
    expect(screen.getByTestId("StockHigh")).toHaveTextContent("120.51");
    expect(screen.getByTestId("StockLow")).toHaveTextContent("110.95");
    expect(screen.getByTestId("StockPrev")).toHaveTextContent("120.12");
  });
});
