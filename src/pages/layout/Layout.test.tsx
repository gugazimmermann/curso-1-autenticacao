import {screen, waitFor} from "@testing-library/react";
import {Route, Routes} from "react-router-dom";
import {PTBR, ROUTES} from "../../common/constants";
import {componentSetup, useAuthMock} from "../../tests-setup";
import Home from "../public/home/Home";
import Dashboard from "../protected/Dashboard";
import Layout from "./Layout";

describe("Layout", () => {
  const setupComponent = (): void => {
    componentSetup({
      component: (
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          </Route>
        </Routes>
      ),
      initialEntries: [ROUTES.HOME],
    });
  };

  test("should navigate to dashboard if currentUser is available", async () => {
    useAuthMock.mockReturnValue({state: {user: LOGGEDUSER}});
    setupComponent();
    await waitFor(() => {
      expect(screen.getByText(PTBR.PAGES.DASHBOARD.TITLE)).toBeInTheDocument();
    });
  });

  test("should navigate to home if currentUser is not available", async () => {
    useAuthMock.mockReturnValue({state: {user: null}});
    setupComponent();
    await waitFor(() => {
      expect(screen.getByText(PTBR.COMPONENTS.HERO.TITLE)).toBeInTheDocument();
    });
  });
});
