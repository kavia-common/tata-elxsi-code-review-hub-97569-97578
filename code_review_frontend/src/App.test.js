import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders brand title", () => {
  render(<App />);
  const text = screen.getByText(/Tata Elxsi/i);
  expect(text).toBeInTheDocument();
});
