import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import Layout from "./Layout";

describe("Layout", () => {
  test("Layout should have header and footer", async () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );
    const title = screen.queryAllByText(String(process.env.REACT_APP_SITE_TITLE));
    const logo = screen.queryAllByAltText("Logo");
    expect(title.length).toBe(2);
    expect(logo.length).toBe(1);
  });
});
