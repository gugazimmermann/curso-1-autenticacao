import {screen, fireEvent, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {type SetupComponentProps} from "../../../tests-setup/test-interfaces";
import {type IUserData} from "../../../common/interfaces/user";
import {PTBR} from "../../../common/constants";
import {componentSetup, updatePassword, useAuthMock} from "../../../tests-setup";
import AccountPassword from "./AccountPassword";

interface SetupAccountPasswordTestProps extends SetupComponentProps {
  inputPasswordValue?: string;
  inputNewPasswordValue?: string;
  inputRepeatPasswordValue?: string;
  result?: {data: IUserData | string};
}

const setupAccountPasswordTest = async ({
  formVerification = false,
  inputPasswordValue = "123456",
  inputNewPasswordValue = "654321",
  inputRepeatPasswordValue = "654321",
  formError = undefined,
  result = {data: USER} satisfies {data: IUserData | string},
  submitError = false,
}: SetupAccountPasswordTestProps = {}): Promise<void> => {
  updatePassword.mockResolvedValue(result);
  useAuthMock.mockReturnValue({
    state: {user: LOGGEDUSER, token: LOGGEDTOKEN},
    dispatch: jest.fn(),
  });
  componentSetup({component: <AccountPassword />});

  const inputPassword = screen.getByPlaceholderText(PTBR.AUTH.CURRENTPASSWORD);
  const inputNewPassword = screen.getByPlaceholderText(PTBR.AUTH.NEWPASSWORD);
  const inputRepeatPassword = screen.getByPlaceholderText(PTBR.AUTH.REPEATNEWPASSWORD);
  const submitButton = screen.getByTestId("account-password-submit-button");

  if (formVerification) {
    expect(inputPassword).toBeInTheDocument();
    expect(inputNewPassword).toBeInTheDocument();
    expect(inputRepeatPassword).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    return;
  }

  userEvent.clear(inputPassword);
  userEvent.clear(inputNewPassword);
  userEvent.clear(inputRepeatPassword);
  userEvent.type(inputPassword, inputPasswordValue);
  userEvent.type(inputNewPassword, inputNewPasswordValue);
  userEvent.type(inputRepeatPassword, inputRepeatPasswordValue);
  fireEvent.click(submitButton);

  if (formError === "password") {
    expect(screen.getByText(PTBR.AUTH.PASSWORDERROR)).toBeInTheDocument();
  } else if (submitError) {
    await waitFor(() => {
      expect(screen.getByText(PTBR.AUTH.PASSWORDCHANGEERROR)).toBeInTheDocument();
    });
  } else {
    await waitFor(() => {
      expect(screen.getByText(PTBR.AUTH.PASSWORDCHANGESUCCESS)).toBeInTheDocument();
    });
  }
};

describe("AccountPassword", () => {
  const tests = [
    {
      title: "renders AccountPassword with form",
      formVerification: true,
    },
    {
      title: "shows error when password is invalid",
      inputPasswordValue: "12345",
      formError: "password",
    },
    {
      title: "shows error when password is different",
      inputNewPasswordValue: "1234567",
      formError: "password",
    },
    {
      title: "handles form submission when updatePassword fails",
      result: {data: "ERROR"},
      submitError: true,
    },
    {
      title: "handles form submission and shows success",
      result: {data: USER},
    },
  ];

  tests.forEach(test => {
    it(test.title, async () => {
      await setupAccountPasswordTest(test);
    });
  });
});
