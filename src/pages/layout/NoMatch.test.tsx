import {render, screen, fireEvent} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {PTBR} from "../../common/constants";
import NoMatch from "./NoMatch";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("NoMatch", () => {
  test("NoMatch should have 404 text", async () => {
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
    render(
      <MemoryRouter>
        <NoMatch />
      </MemoryRouter>,
    );
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText(PTBR.LAYOUT.NOMATCH.TEXT)).toBeInTheDocument();
    fireEvent.click(screen.getByText(PTBR.LAYOUT.NOMATCH.BUTTON));
    expect(mockNavigate).toHaveBeenCalled();
  });
});
