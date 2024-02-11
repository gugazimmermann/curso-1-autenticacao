import {render, screen, fireEvent} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {type NavLinkProps} from "../../../common/interfaces/components";
import {PTBR, ROUTES} from "../../../common/constants";
import Login from "../../../pages/public/auth/Login";
import {LoginIcon} from "../../../icons";
import NavLink from "./NavLink";

describe("AuthLink", () => {
  const setupComponent = (props: NavLinkProps): void => {
    render(
      <MemoryRouter initialEntries={[ROUTES.HOME]}>
        <Routes>
          <Route path={ROUTES.HOME} element={<NavLink {...props} />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Routes>
      </MemoryRouter>,
    );
  };

  test("AuthLink should have text and route", () => {
    setupComponent({route: ROUTES.LOGIN, content: "Navigation Link"});
    const link = screen.getByRole("link", {name: "Navigation Link"});
    expect(link).toHaveAttribute("href", ROUTES.LOGIN);
    fireEvent.click(link);
    expect(screen.getByText(PTBR.PAGES.LOGIN.TITLE)).toBeInTheDocument();
  });

  test("AuthLink should have icon and route", () => {
    setupComponent({route: ROUTES.LOGIN, content: <LoginIcon />});
    const link = screen.getByTestId("login-icon").closest("a");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", ROUTES.LOGIN);
    if (link) fireEvent.click(link);
    expect(screen.getByText(PTBR.PAGES.LOGIN.TITLE)).toBeInTheDocument();
  });
});
