import {render, screen, fireEvent} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {type HeaderProps} from "../../../common/interfaces/components";
import {PTBR, ROUTES} from "../../../common/constants";
import {logoutMock} from "../../../tests-setup";
import Header from "./Header";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Header", () => {
  const setupComponent = (props: HeaderProps = {}): void => {
    render(
      <MemoryRouter>
        <Header {...props} />
      </MemoryRouter>,
    );
  };

  it("Header should have logo, image and menu itens", async () => {
    setupComponent();
    expect(screen.getByText(String(process.env.REACT_APP_SITE_TITLE))).toBeInTheDocument();
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByRole("link", {name: PTBR.LAYOUT.MENU.HOME})).toBeInTheDocument();
    expect(screen.getByRole("link", {name: PTBR.LAYOUT.MENU.BLOG})).toBeInTheDocument();
    expect(screen.getByTestId("login-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("logout-icon")).not.toBeInTheDocument();
  });

  it("Header should have logout", async () => {
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
    logoutMock.mockImplementationOnce(async (): Promise<void> => {
      await Promise.resolve();
    });
    setupComponent({user: LOGGEDUSER});
    fireEvent.click(screen.getByTestId("logout-icon"));
    expect(logoutMock).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.HOME);
  });
});
