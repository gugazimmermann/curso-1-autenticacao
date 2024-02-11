import {render, screen} from "@testing-library/react";
import {PTBR} from "../../../common/constants";
import Login from "./Login";

describe("Login", () => {
  test("Login should have title", async () => {
    render(<Login />);
    expect(screen.getByText(PTBR.PAGES.LOGIN.TITLE)).toBeInTheDocument();
  });
});
