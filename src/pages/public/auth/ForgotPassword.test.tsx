import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {MemoryRouter} from "react-router-dom";
import {PTBR, ROUTES} from "../../../common/constants";
import * as services from "../../../services/auth";
import ForgotPassword from "./ForgotPassword";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../../services/auth", () => ({
  ...jest.requireActual("../../../services/auth"),
  forgotPassword: jest.fn(),
}));

describe("ForgotPassword", () => {
  const setupComponent = (): void => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );
  };

  it("renders ForgotPassword component with form", () => {
    setupComponent();
    expect(screen.getByPlaceholderText(PTBR.AUTH.EMAIL)).toBeInTheDocument();
    expect(screen.getByTestId("auth-submit-button")).toBeInTheDocument();
  });

  it("handles form submission and redirects on successful email", async () => {
    const userData = {
      id: "8cd5be57-1b33-4662-b4c1-286b73f9f4ad",
      name: "User Test",
      email: "test@example.com",
      verified: true,
      code: "mocked-code",
    };
    require("../../../services/auth").forgotPassword.mockResolvedValue({
      data: userData,
    });
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
    setupComponent();
    userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.EMAIL), userData.email);
    fireEvent.click(screen.getByTestId("auth-submit-button"));
    await waitFor(() => {
      expect(services.forgotPassword).toHaveBeenCalledWith({
        email: userData.email,
      });
      expect(mockNavigate).toHaveBeenCalledWith(`${ROUTES.NEW_PASSWORD}/${userData.email}`);
    });
  });

  it("displays error message when email not fount", async () => {
    require("../../../services/auth").forgotPassword.mockResolvedValue({
      data: null,
    });
    setupComponent();
    userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.EMAIL), "test@example.com");
    fireEvent.click(screen.getByTestId("auth-submit-button"));
    await waitFor(() => {
      expect(screen.getByText(PTBR.AUTH.EMAILNOTFOUND)).toBeInTheDocument();
    });
  });

  it("displays error message when email is invalid", async () => {
    setupComponent();
    userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.EMAIL), "test@example");
    fireEvent.click(screen.getByTestId("auth-submit-button"));
    await waitFor(() => {
      expect(services.forgotPassword).not.toHaveBeenCalled();
      expect(screen.getByText(PTBR.AUTH.EMAILERROR)).toBeInTheDocument();
    });
  });
});
