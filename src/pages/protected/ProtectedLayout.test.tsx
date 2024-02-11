import {screen} from "@testing-library/react";
import {Routes, Route} from "react-router-dom";
import {useAuthMock, componentSetup} from "../../tests-setup";
import {PTBR, ROUTES} from "../../common/constants";
import ProtectedLayout from "./ProtectedLayout";
import Account from "./account/Account";
import Dashboard from "./Dashboard";

describe("ProtectedLayout", () => {
  test("renders Dashboard when authenticated", () => {
    useAuthMock.mockReturnValue({
      state: {user: LOGGEDUSER, token: LOGGEDTOKEN},
    });
    componentSetup({
      component: (
        <Routes>
          <Route element={<ProtectedLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          </Route>
        </Routes>
      ),
      initialEntries: [ROUTES.DASHBOARD],
    });
    expect(screen.getByText(`${PTBR.PAGES.DASHBOARD.WELCOME} ${LOGGEDUSER.name}`)).toBeInTheDocument();
  });

  test("renders Account when authenticated", () => {
    useAuthMock.mockReturnValue({
      state: {user: LOGGEDUSER, token: LOGGEDTOKEN},
    });
    componentSetup({
      component: (
        <Routes>
          <Route element={<ProtectedLayout />}>
            <Route path={ROUTES.ACCOUNT} element={<Account />} />
          </Route>
        </Routes>
      ),
      initialEntries: [ROUTES.ACCOUNT],
    });
    expect(screen.getByText(PTBR.PAGES.ACCOUNT.USERDATA.TITLE)).toBeInTheDocument();
    expect(screen.getByText(PTBR.PAGES.ACCOUNT.CHANGEPASSWORD.TITLE)).toBeInTheDocument();
  });
});
