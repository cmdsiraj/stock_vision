import React from "react";
import { render } from "@testing-library/react";
import TodayStockReadings from "../components/TodayStockReadings";

describe("TodayStockReadings", () => {
  const data = {
    code: "AAPL",
    Open: 130.32,
    High: 132.43,
    Low: 129.54,
    Close: 131.79,
    AdjClose: 131.34,
    Volume: 12345678,
  };

  test("renders the component with correct data", () => {
    const { getByText } = render(<TodayStockReadings data={data} />);

    // Check that the component renders the correct text
    expect(getByText("Today's stock data for AAPL")).toBeInTheDocument();
    expect(getByText("OPEN")).toBeInTheDocument();
    expect(getByText("HIGH")).toBeInTheDocument();
    expect(getByText("LOW")).toBeInTheDocument();
    expect(getByText("CLOSE")).toBeInTheDocument();
    expect(getByText("ADJ CLOSE")).toBeInTheDocument();
    expect(getByText("VOLUME")).toBeInTheDocument();

    // Check that the component renders the correct data
    expect(getByText("130.32")).toBeInTheDocument();
    expect(getByText("132.43")).toBeInTheDocument();
    expect(getByText("129.54")).toBeInTheDocument();
    expect(getByText("131.79")).toBeInTheDocument();
    expect(getByText("12345678")).toBeInTheDocument();
  });
});
