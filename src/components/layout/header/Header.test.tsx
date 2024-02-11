import {render, screen, fireEvent} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {type HeaderProps} from "../../../common/interfaces/components";
import {PTBR, ROUTES} from "../../../common/constants";
import * as Auth from "../../../services/auth";
import Header from "./Header";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../../services/auth", () => ({
  ...jest.requireActual("../../../services/auth"),
  logout: jest.fn(),
}));

describe("Header", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const setupComponent = (props: HeaderProps = {}): void => {
    render(
      <MemoryRouter>
        <Header {...props} />
      </MemoryRouter>,
    );
  };

  test("Header should have logo, image and menu itens", async () => {
    setupComponent();
    expect(screen.getByText(String(process.env.REACT_APP_SITE_TITLE))).toBeInTheDocument();
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByRole("link", {name: PTBR.LAYOUT.MENU.HOME})).toBeInTheDocument();
    expect(screen.getByRole("link", {name: PTBR.LAYOUT.MENU.BLOG})).toBeInTheDocument();
    expect(screen.getByTestId("login-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("logout-icon")).not.toBeInTheDocument();
  });

  test("Header should have logout", async () => {
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
    setupComponent({
      user: {
        id: "49c88ac9-77cd-49d7-9311-25987fce2086",
        name: "Test User",
        email: "test@teste.com",
        verified: true,
      },
    });
    fireEvent.click(screen.getByTestId("logout-icon"));
    expect(Auth.logout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.HOME);
  });
});
