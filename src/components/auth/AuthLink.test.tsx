import {render, screen, fireEvent} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {PTBR, ROUTES} from "../../common/constants";
import Login from "../../pages/public/auth/Login";
import AuthLink from "./AuthLink";

describe("AuthLink", () => {
  test("AuthLink should have text and route", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.HOME]}>
        <Routes>
          <Route path={ROUTES.HOME} element={<AuthLink route={ROUTES.LOGIN} text="Login Link" />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Routes>
      </MemoryRouter>,
    );
    const link = screen.getByRole("link", {name: "Login Link"});
    expect(link).toHaveAttribute("href", ROUTES.LOGIN);
    fireEvent.click(link);
    expect(screen.getByText(PTBR.PAGES.LOGIN.TITLE)).toBeInTheDocument();
  });
});
