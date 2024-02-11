import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {MemoryRouter} from "react-router-dom";
import {PTBR, ROUTES} from "../../../common/constants";
import * as services from "../../../services/auth";
import Login from "./Login";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../../services/auth", () => ({
  ...jest.requireActual("../../../services/auth"),
  login: jest.fn(),
}));

describe("Login", () => {
  const setupComponent = (): void => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
  };

  test("renders Login component with form", () => {
    setupComponent();
    expect(screen.getByPlaceholderText(PTBR.AUTH.EMAIL)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(PTBR.AUTH.PASSWORD)).toBeInTheDocument();
    expect(screen.getByTestId("auth-submit-button")).toBeInTheDocument();
  });

  test("handles form submission and redirects on successful login", async () => {
    require("../../../services/auth").login.mockResolvedValue({
      data: {
        id: "8cd5be57-1b33-4662-b4c1-286b73f9f4ad",
        name: "User Test",
        email: "test@example.com",
        verified: true,
        token: "mocked-token",
      },
    });
    const spy = jest.spyOn(Storage.prototype, "setItem");
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
    setupComponent();
    userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.EMAIL), "test@example.com");
    userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.PASSWORD), "password");
    fireEvent.click(screen.getByTestId("auth-submit-button"));
    await waitFor(() => {
      expect(services.login).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
      expect(spy).toHaveBeenCalledWith("token", "mocked-token");
      expect(mockNavigate).toHaveBeenCalledWith(ROUTES.DASHBOARD);
    });
  });

  test("displays error message on login failure", async () => {
    require("../../../services/auth").login.mockResolvedValue({
      data: "Unauthorized",
    });
    setupComponent();
    userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.EMAIL), "test@example.com");
    userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.PASSWORD), "wrongpassword");
    fireEvent.click(screen.getByTestId("auth-submit-button"));
    await waitFor(() => {
      expect(screen.getByText(PTBR.AUTH.USERUNAUTHORIZED)).toBeInTheDocument();
    });
  });

  test("displays error message when user is unverified", async () => {
    require("../../../services/auth").login.mockResolvedValue({
      data: "Unverified",
    });
    setupComponent();
    userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.EMAIL), "test@example.com");
    userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.PASSWORD), "password");
    fireEvent.click(screen.getByTestId("auth-submit-button"));
    await waitFor(() => {
      expect(screen.getByText(PTBR.AUTH.EMAILUNVERIFIED)).toBeInTheDocument();
    });
  });

  test("displays error message when email is invalid", async () => {
    setupComponent();
    userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.EMAIL), "test@example");
    userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.EMAIL), "password");
    fireEvent.click(screen.getByTestId("auth-submit-button"));
    await waitFor(() => {
      expect(services.login).not.toHaveBeenCalled();
      expect(screen.getByText(PTBR.AUTH.EMAILERROR)).toBeInTheDocument();
    });
  });
});
