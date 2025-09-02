import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders hero heading", () => {
  render(<App />);
  const text = screen.getByText(/AI-Powered Code Review/i);
  expect(text).toBeInTheDocument();
});
