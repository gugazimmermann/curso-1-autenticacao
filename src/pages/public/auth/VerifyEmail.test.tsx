import {screen, fireEvent, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {PTBR, ROUTES} from "../../../common/constants";
import {componentSetup, verifyEmailMock, reSendCodeMock} from "../../../tests-setup";
import VerifyEmail from "./VerifyEmail";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const fillForm = (data: {email: string; code: string}): void => {
  userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.EMAIL), data.email);
  userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.CODE), data.code);
  fireEvent.click(screen.getByTestId("auth-submit-button"));
};

describe("VerifyEmail", () => {
  test("handles form submission and redirects on successful verify", async () => {
    verifyEmailMock.mockResolvedValue({data: LOGGEDUSER});
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
    componentSetup({component: <VerifyEmail />});
    fillForm({email: USER.email, code: String(USER.code)});
    await waitFor(() => {
      expect(verifyEmailMock).toHaveBeenCalledWith({
        email: USER.email,
        code: String(USER.code),
      });
      expect(mockNavigate).toHaveBeenCalledWith(`${ROUTES.LOGIN}/${USER.email}`);
    });
  });

  test("displays error message when user is verification fail", async () => {
    verifyEmailMock.mockResolvedValue({data: "Error"});
    componentSetup({component: <VerifyEmail />});
    fillForm({email: USER.email, code: String(USER.code)});
    await waitFor(() => {
      expect(screen.getByText(PTBR.AUTH.CODEERROR)).toBeInTheDocument();
    });
  });

  test("displays error message when email is invalid", async () => {
    componentSetup({component: <VerifyEmail />});
    fillForm({email: "test@test", code: String(USER.code)});
    await waitFor(() => {
      expect(verifyEmailMock).not.toHaveBeenCalled();
      expect(screen.getByText(PTBR.AUTH.EMAILERROR)).toBeInTheDocument();
    });
  });

  test("displays error message when code is invalid", async () => {
    componentSetup({component: <VerifyEmail />});
    fillForm({email: USER.email, code: "12345"});
    await waitFor(() => {
      expect(verifyEmailMock).not.toHaveBeenCalled();
      expect(screen.getByText(PTBR.AUTH.CODEERROR)).toBeInTheDocument();
    });
  });

  test("handles form resend code successfuly", async () => {
    reSendCodeMock.mockResolvedValue({data: LOGGEDUSER});
    componentSetup({component: <VerifyEmail />});
    userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.EMAIL), USER.email);
    fireEvent.click(screen.getByTestId("verify-code-resend-button"));
    await waitFor(() => {
      expect(reSendCodeMock).toHaveBeenCalledWith({email: USER.email});
      expect(screen.getByText(`${PTBR.AUTH.CODESENDED} ${USER.email}`)).toBeInTheDocument();
    });
  });

  test("displays error message when resend code fail", async () => {
    reSendCodeMock.mockResolvedValue({data: "Error"});
    componentSetup({component: <VerifyEmail />});
    userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.EMAIL), USER.email);
    fireEvent.click(screen.getByTestId("verify-code-resend-button"));
    await waitFor(() => {
      expect(screen.getByText(PTBR.AUTH.SENDCODEERROR)).toBeInTheDocument();
    });
  });

  test("displays error message when resend code email is invalid", async () => {
    componentSetup({component: <VerifyEmail />});
    userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.EMAIL), "test@test");
    fireEvent.click(screen.getByTestId("verify-code-resend-button"));
    await waitFor(() => {
      expect(reSendCodeMock).not.toHaveBeenCalled();
      expect(screen.getByText(PTBR.AUTH.EMAILERROR)).toBeInTheDocument();
    });
  });
});
