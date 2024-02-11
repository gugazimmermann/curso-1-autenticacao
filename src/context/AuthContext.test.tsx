import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {AuthProvider, useAuth} from "./AuthContext";

describe("AuthContext", () => {
  test("AuthContext handles LOGIN, UPDATE_USER and LOGOUT actions", () => {
    const TestComponent = (): JSX.Element => {
      const {state, dispatch} = useAuth();
      return (
        <>
          <span data-testid="test-name">{state.user?.name}</span>
          <button
            data-testid="test-login-button"
            onClick={() => {
              dispatch({
                type: "LOGIN",
                payload: {
                  user: LOGGEDUSER,
                  token: LOGGEDTOKEN,
                },
              });
            }}>
            Login
          </button>
          <button
            data-testid="test-update-button"
            onClick={() => {
              dispatch({
                type: "UPDATE_USER",
                payload: {user: {...LOGGEDUSER, name: "Test User"}},
              });
            }}>
            Update User
          </button>
          <button
            data-testid="test-logout-button"
            onClick={() => {
              dispatch({type: "LOGOUT"});
            }}>
            Logout
          </button>
        </>
      );
    };
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );
    const userElement = screen.getByTestId("test-name");
    userEvent.click(screen.getByTestId("test-login-button"));
    expect(userElement.textContent).toBe(USER.name);
    userEvent.click(screen.getByTestId("test-update-button"));
    expect(userElement.textContent).toBe("Test User");
    userEvent.click(screen.getByTestId("test-logout-button"));
    expect(userElement.textContent).toBe("");
  });

  test("AuthContext throws an error when useAuth is used outside of AuthProvider", () => {
    const TestComponent = (): JSX.Element | null => {
      try {
        useAuth();
      } catch (error: any) {
        return <span data-testid="error">{error.message}</span>;
      }
      return null;
    };
    render(<TestComponent />);
    const errorElement = screen.getByTestId("error");
    expect(errorElement.textContent).toBe("useAuth must be used within an AuthProvider");
  });
});
