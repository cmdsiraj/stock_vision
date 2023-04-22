import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import StockTable from "../components/StockTable";

describe("StockTable component", () => {
  test("Should render table with data", async () => {
    const mockData = [
      {
        name: "AAPL",
        value: 120.345,
        prev: 120.133,
        open: 120.12,
        high: 120.51,
        low: 110.95,
      },
      {
        name: "GOOG",
        value: 200.124,
        prev: 195.123,
        open: 190.133,
        high: 220.43,
        low: 180.12,
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    await act(async () => {
      render(<StockTable />);
    });

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
    expect(screen.getByText("Change")).toBeInTheDocument();
    expect(screen.getByText("%Change")).toBeInTheDocument();
    expect(screen.getByText("Open")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
    expect(screen.getByText("Low")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("AAPL")).toBeInTheDocument());
    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("120.34")).toBeInTheDocument();
    expect(screen.getByText("0.21")).toBeInTheDocument();
    expect(screen.getByText("0.18%")).toBeInTheDocument();
    expect(screen.getByText("120.12")).toBeInTheDocument();
    expect(screen.getByText("120.51")).toBeInTheDocument();
    expect(screen.getByText("110.95")).toBeInTheDocument();
    expect(screen.getByText("120.13")).toBeInTheDocument();

    expect(screen.getByText("GOOG")).toBeInTheDocument();
    expect(screen.getByText("200.12")).toBeInTheDocument();
    expect(screen.getByText("5.00")).toBeInTheDocument();
    expect(screen.getByText("2.56%")).toBeInTheDocument();
    expect(screen.getByText("190.13")).toBeInTheDocument();
    expect(screen.getByText("220.43")).toBeInTheDocument();
    expect(screen.getByText("180.12")).toBeInTheDocument();
    expect(screen.getByText("195.12")).toBeInTheDocument();
  });
  test('displays "Unable to Show Data" when there is no stock data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );
    await act(async () => {
      render(<StockTable />);
    });
    const noDataText = await screen.findByText(/Unable to Show Data/i);
    expect(noDataText).toBeInTheDocument();
  });
});

// // mock the API response
// global.fetch = jest.fn(() => ({
//   getTableDisplayData: () => Promise.resolve(),
// }));

// describe("StockTable", () => {
//   it("should fetch and display stock data", async () => {
//     render(<StockTable />);

//     // wait for the API response to be processed
//   });

//   it('should show "Unable to Show Data" if API request fails', async () => {
//     // mock the API call to reject with an error
//     jest.mock("./api", () => ({
//       getTableDisplayData: jest.fn(() =>
//         Promise.reject(new Error("API request failed"))
//       ),
//     }));

//     render(<StockTable />);

//     // wait for the error message to appear
//     await waitFor(() =>
//       expect(screen.getByText("Unable to Show Data")).toBeInTheDocument()
//     );
//   });
// });
