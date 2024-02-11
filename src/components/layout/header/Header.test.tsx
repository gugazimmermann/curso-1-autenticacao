import {screen, fireEvent} from "@testing-library/react";
import {PTBR} from "../../../common/constants";
import {componentSetup, logoutMock, useAuthMock} from "../../../tests-setup";
import Header from "./Header";

describe("Header", () => {
  test("Header should have logo, image and menu itens", async () => {
    useAuthMock.mockReturnValue({state: {user: null}});
    componentSetup({component: <Header />});
    expect(screen.getByText(String(process.env.REACT_APP_SITE_TITLE))).toBeInTheDocument();
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByRole("link", {name: PTBR.LAYOUT.MENU.HOME})).toBeInTheDocument();
    expect(screen.getByRole("link", {name: PTBR.LAYOUT.MENU.BLOG})).toBeInTheDocument();
    expect(screen.getByTestId("login-icon")).toBeInTheDocument();
    expect(screen.queryByText(PTBR.PAGES.DASHBOARD.TITLE)).not.toBeInTheDocument();
    expect(screen.queryByTestId("logout-icon")).not.toBeInTheDocument();
  });

  test("Header should have logout", async () => {
    const mockDispatch = jest.fn();
    useAuthMock.mockReturnValue({
      state: {user: LOGGEDUSER},
      dispatch: mockDispatch,
    });
    componentSetup({component: <Header />});
    expect(screen.getByText(PTBR.PAGES.DASHBOARD.TITLE)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("logout-icon"));
    expect(logoutMock).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({type: "LOGOUT"});
  });
});
