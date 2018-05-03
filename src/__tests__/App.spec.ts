import React from "react";
import { render } from "react-testing-library";

import App from "@/App";

describe("A suite", () => {
  it("should render without throwing an error", () => {
    const { container } = render(<App />);
  });
});
