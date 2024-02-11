import {screen, fireEvent, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {PTBR, ROUTES} from "../../../common/constants";
import {componentSetup, registerMock} from "../../../tests-setup";
import Register from "./Register";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const defaultData = {
  name: USER.name,
  email: USER.email,
  password: USER.password,
  repeatpassword: USER.password,
};

const fillForm = (data: {name: string; email: string; password: string; repeatpassword: string}): void => {
  userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.NAME), data.name);
  userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.EMAIL), data.email);
  userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.PASSWORD), data.password);
  userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.REPEATPASSWORD), data.repeatpassword);
  fireEvent.click(screen.getByTestId("auth-submit-button"));
};

describe("Register", () => {
  test("handles form submission and redirects on successful register", async () => {
    registerMock.mockResolvedValue({data: LOGGEDUSER});
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
    componentSetup({component: <Register />});
    fillForm(defaultData);
    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledWith(defaultData);
      expect(mockNavigate).toHaveBeenCalledWith(`${ROUTES.VERIFY_EMAIL}/${LOGGEDUSER.email}`);
    });
  });

  test("displays error message when user is register fail", async () => {
    registerMock.mockResolvedValue({data: "Error"});
    componentSetup({component: <Register />});
    fillForm(defaultData);
    await waitFor(() => {
      expect(screen.getByText(PTBR.AUTH.REGISTERERROR)).toBeInTheDocument();
    });
  });

  test("displays error message when name is invalid", async () => {
    componentSetup({component: <Register />});
    fillForm({...defaultData, name: "AA"});
    await waitFor(() => {
      expect(registerMock).not.toHaveBeenCalled();
      expect(screen.getByText(PTBR.AUTH.NAMEERROR)).toBeInTheDocument();
    });
  });

  test("displays error message when email is invalid", async () => {
    componentSetup({component: <Register />});
    fillForm({...defaultData, email: "test@test"});
    await waitFor(() => {
      expect(registerMock).not.toHaveBeenCalled();
      expect(screen.getByText(PTBR.AUTH.EMAILERROR)).toBeInTheDocument();
    });
  });

  test("displays error message when password is invalid", async () => {
    componentSetup({component: <Register />});
    fillForm({...defaultData, password: "12345"});
    await waitFor(() => {
      expect(registerMock).not.toHaveBeenCalled();
      expect(screen.getByText(PTBR.AUTH.PASSWORDERROR)).toBeInTheDocument();
    });
  });

  test("displays error message when password is different", async () => {
    componentSetup({component: <Register />});
    fillForm({...defaultData, repeatpassword: "1234567"});
    await waitFor(() => {
      expect(registerMock).not.toHaveBeenCalled();
      expect(screen.getByText(PTBR.AUTH.PASSWORDERROR)).toBeInTheDocument();
    });
  });
});
