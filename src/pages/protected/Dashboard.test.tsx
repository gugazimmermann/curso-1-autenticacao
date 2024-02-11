import {screen} from "@testing-library/react";
import {PTBR} from "../../common/constants";
import {componentSetup, useAuthMock} from "../../tests-setup";
import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  test("Dashboard should have Dashboard text", async () => {
    useAuthMock.mockReturnValue({state: {user: LOGGEDUSER}});
    componentSetup({component: <Dashboard />});
    expect(
      screen.getByRole("heading", {
        name: PTBR.PAGES.DASHBOARD.TITLE,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(`${PTBR.PAGES.DASHBOARD.WELCOME} ${LOGGEDUSER.name}`)).toBeInTheDocument();
  });
});
