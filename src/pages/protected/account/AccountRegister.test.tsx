import {screen, fireEvent, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {type SetupComponentProps} from "../../../tests-setup/test-interfaces";
import {type IUserData} from "../../../common/interfaces/user";
import {PTBR} from "../../../common/constants";
import {componentSetup, updateUser, useAuthMock} from "../../../tests-setup";
import AccountRegister from "./AccountRegister";

interface SetupAccountRegisterTestProps extends SetupComponentProps {
  inputNameValue?: string;
  inputEmailValue?: string;
  result?: {data: IUserData | string};
  isVerified?: boolean;
}

const setupAccountRegisterTest = async ({
  formVerification = false,
  inputNameValue = USER.name,
  inputEmailValue = USER.email,
  formError = undefined,
  result = {data: USER} satisfies {data: IUserData | string},
  isVerified = true,
  submitError = false,
}: SetupAccountRegisterTestProps = {}): Promise<void> => {
  updateUser.mockResolvedValue(result);
  useAuthMock.mockReturnValue({
    state: {user: LOGGEDUSER, token: LOGGEDTOKEN},
    dispatch: jest.fn(),
  });
  componentSetup({component: <AccountRegister />});

  const inputName = screen.getByPlaceholderText(PTBR.AUTH.NAME);
  const inputEmail = screen.getByPlaceholderText(PTBR.AUTH.EMAIL);
  const submitButton = screen.getByTestId("account-register-submit-button");

  if (formVerification) {
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    return;
  }

  userEvent.clear(inputName);
  userEvent.clear(inputEmail);
  userEvent.type(inputName, inputNameValue);
  userEvent.type(inputEmail, inputEmailValue);
  fireEvent.click(submitButton);

  if (formError === "name") {
    expect(screen.getByText(PTBR.AUTH.NAMEERROR)).toBeInTheDocument();
  } else if (formError === "email") {
    expect(screen.getByText(PTBR.AUTH.EMAILERROR)).toBeInTheDocument();
  } else if (submitError) {
    await waitFor(() => {
      expect(screen.getByText(PTBR.AUTH.CHANGEUSERDATAERROR)).toBeInTheDocument();
    });
  } else if (!isVerified) {
    await waitFor(() => {
      expect(screen.getByText(PTBR.AUTH.CHANGEUSERDATAEMAIL)).toBeInTheDocument();
    });
  } else {
    await waitFor(() => {
      expect(screen.getByText(PTBR.AUTH.CHANGEUSERDATASUCCESS)).toBeInTheDocument();
    });
  }
};

describe("AccountRegister", () => {
  const tests = [
    {
      title: "renders AccountRegister with form",
      formVerification: true,
    },
    {
      title: "shows error when name is invalid",
      inputNameValue: "AA",
      formError: "name",
    },
    {
      title: "shows error when email is invalid",
      inputEmailValue: "john@test",
      formError: "email",
    },
    {
      title: "handles form submission when updateUser fails",
      result: {data: "ERROR"},
      submitError: true,
    },
    {
      title: "handles form submission and shows email warning",
      result: {data: {...USER, verified: false}},
      isVerified: false,
    },
    {
      title: "handles form submission and shows success",
      result: {data: USER},
    },
  ];

  tests.forEach(test => {
    it(test.title, async () => {
      await setupAccountRegisterTest(test);
    });
  });
});
