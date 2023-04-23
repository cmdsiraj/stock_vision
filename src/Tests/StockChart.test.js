import { render } from "@testing-library/react";
import StockChart from "../components/StockChart";

describe("StockChart", () => {
  it("renders the chart", () => {
    const data = [
      { date: "2022-01-01", price: 10 },
      { date: "2022-01-02", price: 20 },
      { date: "2022-01-03", price: 30 },
    ];
    const ticker = "AAPL";
    const { container } = render(<StockChart data={data} ticker={ticker} />);
    const chartContainer = container.querySelector("#stock-chart");
    expect(chartContainer).toBeInTheDocument();
  });
});
