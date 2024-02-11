import {screen, fireEvent, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {PTBR, ROUTES} from "../../../common/constants";
import {componentSetup, loginMock} from "../../../tests-setup";
import Login from "./Login";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const fillForm = (data: {email: string; password: string}): void => {
  userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.EMAIL), data.email);
  userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.PASSWORD), String(data.password));
  fireEvent.click(screen.getByTestId("auth-submit-button"));
};

describe("Login", () => {
  test("handles form submission and redirects on successful login", async () => {
    loginMock.mockResolvedValue({data: LOGGEDUSER});
    const spy = jest.spyOn(Storage.prototype, "setItem");
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
    componentSetup({component: <Login />});
    fillForm({email: USER.email, password: USER.password});
    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        email: USER.email,
        password: USER.password,
      });
      expect(spy).toHaveBeenCalledWith("token", LOGGEDTOKEN);
      expect(mockNavigate).toHaveBeenCalledWith(ROUTES.DASHBOARD);
    });
  });

  test("displays error message on login failure", async () => {
    loginMock.mockResolvedValue({data: "Unauthorized"});
    componentSetup({component: <Login />});
    fillForm({email: USER.email, password: USER.password});
    await waitFor(() => {
      expect(screen.getByText(PTBR.AUTH.USERUNAUTHORIZED)).toBeInTheDocument();
    });
  });

  test("displays error message when user is unverified", async () => {
    loginMock.mockResolvedValue({data: "Unverified"});
    componentSetup({component: <Login />});
    fillForm({email: USER.email, password: USER.password});
    await waitFor(() => {
      expect(screen.getByText(PTBR.AUTH.EMAILUNVERIFIED)).toBeInTheDocument();
    });
  });

  test("displays error message when email is invalid", async () => {
    componentSetup({component: <Login />});
    fillForm({email: "test@test", password: USER.password});
    await waitFor(() => {
      expect(loginMock).not.toHaveBeenCalled();
      expect(screen.getByText(PTBR.AUTH.EMAILERROR)).toBeInTheDocument();
    });
  });
});
