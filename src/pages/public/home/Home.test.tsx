import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {PTBR} from "../../../common/constants";
import Home from "./Home";

describe("Home", () => {
  test("Home should have Hero", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByText(PTBR.COMPONENTS.HERO.TITLE)).toBeInTheDocument();
  });
});
