import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar", () => {
  test("renders with correct placeholder text", () => {
    const placeHolder = "Search...";
    const onClickFunction = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar placeHolder={placeHolder} onClickFunction={onClickFunction} />
    );
    expect(getByPlaceholderText(placeHolder)).toBeInTheDocument();
  });

  test("onClickFunction is called when Search button is clicked", () => {
    const onClickFunction = jest.fn();
    const { getByRole, getByLabelText } = render(
      <SearchBar placeHolder="Search..." onClickFunction={onClickFunction} />
    );
    const searchInput = getByLabelText("Search");
    const searchButton = getByRole("button", { name: /search/i });

    fireEvent.change(searchInput, { target: { value: "test query" } });
    fireEvent.click(searchButton);

    expect(onClickFunction).toHaveBeenCalledTimes(1);
    expect(onClickFunction).toHaveBeenCalledWith("test query");
  });
});
