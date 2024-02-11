import {screen, fireEvent, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {PTBR} from "../../../common/constants";
import {componentSetup, loginMock, useAuthMock} from "../../../tests-setup";
import Login from "./Login";

const fillForm = (data: {email: string; password: string}): void => {
  userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.EMAIL), data.email);
  userEvent.type(screen.getByPlaceholderText(PTBR.AUTH.PASSWORD), String(data.password));
  fireEvent.click(screen.getByTestId("auth-submit-button"));
};

describe("Login", () => {
  test("handles form submission on successful login", async () => {
    const mockDispatch = jest.fn();
    useAuthMock.mockReturnValue({dispatch: mockDispatch});
    loginMock.mockResolvedValue({data: LOGGEDUSER});
    const spy = jest.spyOn(Storage.prototype, "setItem");
    componentSetup({component: <Login />});
    fillForm({email: USER.email, password: USER.password});
    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        email: USER.email,
        password: USER.password,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "LOGIN",
        payload: {
          user: {
            id: LOGGEDUSER.id,
            name: LOGGEDUSER.name,
            email: LOGGEDUSER.email,
          },
          token: LOGGEDTOKEN,
        },
      });
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  test("displays error message on login failure", async () => {
    useAuthMock.mockReturnValue({dispatch: null});
    loginMock.mockResolvedValue({data: "Unauthorized"});
    componentSetup({component: <Login />});
    fillForm({email: USER.email, password: USER.password});
    await waitFor(() => {
      expect(screen.getByText(PTBR.AUTH.USERUNAUTHORIZED)).toBeInTheDocument();
    });
  });

  test("displays error message when user is unverified", async () => {
    useAuthMock.mockReturnValue({dispatch: null});
    loginMock.mockResolvedValue({data: "Unverified"});
    componentSetup({component: <Login />});
    fillForm({email: USER.email, password: USER.password});
    await waitFor(() => {
      expect(screen.getByText(PTBR.AUTH.EMAILUNVERIFIED)).toBeInTheDocument();
    });
  });

  test("displays error message when email is invalid", async () => {
    useAuthMock.mockReturnValue({dispatch: null});
    componentSetup({component: <Login />});
    fillForm({email: "test@test", password: USER.password});
    await waitFor(() => {
      expect(loginMock).not.toHaveBeenCalled();
      expect(screen.getByText(PTBR.AUTH.EMAILERROR)).toBeInTheDocument();
    });
  });
});
