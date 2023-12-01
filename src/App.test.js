import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

describe("menu", () => {
  it("Should render without crashing", async () => {
    render(
      <Provider store={store}>
        <App></App>
      </Provider>
    );
  });
});
