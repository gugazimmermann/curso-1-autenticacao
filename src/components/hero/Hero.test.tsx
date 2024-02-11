import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {PTBR} from "../../common/constants";
import Hero from "./Hero";

describe("Hero", () => {
  test("Hero render correctly", async () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    );
    expect(screen.getByText(PTBR.COMPONENTS.HERO.TITLE)).toBeInTheDocument();
    expect(screen.getByText(PTBR.COMPONENTS.HERO.SUBTITLE)).toBeInTheDocument();
    expect(screen.getByText(PTBR.COMPONENTS.HERO.CONTENT)).toBeInTheDocument();
    expect(screen.getByText(PTBR.COMPONENTS.LOGINBUTTON.TEXT)).toBeInTheDocument();
  });
});
