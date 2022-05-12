import React from "react";
import App from "../App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("Register button gets click", () => {
  render(<App />);
  const onClick = jest.fn()

  userEvent.click(screen.getByText(/Ainda não tenho conta/i));
  expect(onClick).toHaveBeenCalledTimes(1);
});
