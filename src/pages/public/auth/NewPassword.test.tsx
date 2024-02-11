import {screen, fireEvent, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {PTBR, ROUTES} from "../../../common/constants";
import {componentSetup, newPasswordMock} from "../../../tests-setup";
import NewPassword from "./NewPassword";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const defaultData = {
  email: USER.email,
  code: String(USER.code),
  password: USER.password,
  repeatpassword: USER.password,
};

const fillForm = (data: {email: string; code: string; password: string; repeatpassword: string}): void => {
  userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.EMAIL), data.email);
  userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.CODE), String(data.code));
  userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.PASSWORD), data.password);
  userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.REPEATPASSWORD), data.repeatpassword);
  fireEvent.click(screen.getByTestId("auth-submit-button"));
};

describe("NewPassword", () => {
  it("handles form submission and redirects on successful change password", async () => {
    newPasswordMock.mockResolvedValue({data: LOGGEDUSER});
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
    componentSetup({component: <NewPassword />});
    fillForm(defaultData);
    await waitFor(() => {
      expect(newPasswordMock).toHaveBeenCalledWith(defaultData);
      expect(mockNavigate).toHaveBeenCalledWith(`${ROUTES.LOGIN}/${USER.email}`);
    });
  });

  it("displays error message when user is unverified", async () => {
    newPasswordMock.mockResolvedValue({data: "Unverified"});
    componentSetup({component: <NewPassword />});
    fillForm(defaultData);
    await waitFor(() => {
      expect(screen.getByText(PTBR.AUTH.EMAILUNVERIFIED)).toBeInTheDocument();
    });
  });

  it("displays error message on changePassword failure", async () => {
    newPasswordMock.mockResolvedValue({data: "Unauthorized"});
    componentSetup({component: <NewPassword />});
    fillForm(defaultData);
    await waitFor(() => {
      expect(screen.getByText(PTBR.AUTH.USERUNAUTHORIZED)).toBeInTheDocument();
    });
  });

  it("displays error message when email is invalid", async () => {
    componentSetup({component: <NewPassword />});
    fillForm({...defaultData, email: "test@test"});
    await waitFor(() => {
      expect(newPasswordMock).not.toHaveBeenCalled();
      expect(screen.getByText(PTBR.AUTH.EMAILERROR)).toBeInTheDocument();
    });
  });

  it("displays error message when code is invalid", async () => {
    componentSetup({component: <NewPassword />});
    fillForm({...defaultData, code: "12345"});
    await waitFor(() => {
      expect(newPasswordMock).not.toHaveBeenCalled();
      expect(screen.getByText(PTBR.AUTH.CODEERROR)).toBeInTheDocument();
    });
  });

  it("displays error message when password is invalid", async () => {
    componentSetup({component: <NewPassword />});
    fillForm({...defaultData, password: "12345", repeatpassword: "12345"});
    await waitFor(() => {
      expect(newPasswordMock).not.toHaveBeenCalled();
      expect(screen.getByText(PTBR.AUTH.PASSWORDERROR)).toBeInTheDocument();
    });
  });

  it("displays error message when password is different", async () => {
    componentSetup({component: <NewPassword />});
    fillForm({...defaultData, repeatpassword: "1234567"});
    await waitFor(() => {
      expect(newPasswordMock).not.toHaveBeenCalled();
      expect(screen.getByText(PTBR.AUTH.PASSWORDERROR)).toBeInTheDocument();
    });
  });
});
