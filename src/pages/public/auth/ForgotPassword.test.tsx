import {screen, fireEvent, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {PTBR, ROUTES} from "../../../common/constants";
import {componentSetup, forgotPasswordMock} from "../../../tests-setup";
import ForgotPassword from "./ForgotPassword";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const fillForm = (data: {email: string}): void => {
  userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.EMAIL), data.email);
  fireEvent.click(screen.getByTestId("auth-submit-button"));
};

describe("ForgotPassword", () => {
  test("handles form submission and redirects on successful email", async () => {
    forgotPasswordMock.mockResolvedValue({data: LOGGEDUSER});
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
    componentSetup({component: <ForgotPassword />});
    fillForm({email: USER.email});
    await waitFor(() => {
      expect(forgotPasswordMock).toHaveBeenCalledWith({
        email: USER.email,
      });
      expect(mockNavigate).toHaveBeenCalledWith(`${ROUTES.NEW_PASSWORD}/${LOGGEDUSER.email}`);
    });
  });

  test("displays error message when email not found", async () => {
    forgotPasswordMock.mockResolvedValue({data: undefined});
    componentSetup({component: <ForgotPassword />});
    fillForm({email: USER.email});
    await waitFor(() => {
      expect(screen.getByText(PTBR.AUTH.EMAILNOTFOUND)).toBeInTheDocument();
    });
  });

  test("displays error message when email is invalid", async () => {
    componentSetup({component: <ForgotPassword />});
    fillForm({email: "test@test"});
    await waitFor(() => {
      expect(forgotPasswordMock).not.toHaveBeenCalled();
      expect(screen.getByText(PTBR.AUTH.EMAILERROR)).toBeInTheDocument();
    });
  });
});
