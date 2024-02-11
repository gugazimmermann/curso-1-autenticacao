import {screen} from "@testing-library/react";
import {PTBR} from "../../../common/constants";
import {componentSetup, useAuthMock} from "../../../tests-setup";
import Account from "./Account";

describe("Account", () => {
  test("renders Account with table and form", () => {
    useAuthMock.mockReturnValue({state: {user: LOGGEDUSER}});
    componentSetup({component: <Account />});
    expect(screen.getByText(PTBR.PAGES.ACCOUNT.USERDATA.TITLE)).toBeInTheDocument();
    expect(screen.getByText(PTBR.PAGES.ACCOUNT.CHANGEPASSWORD.TITLE)).toBeInTheDocument();
  });
});
