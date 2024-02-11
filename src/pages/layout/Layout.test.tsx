import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {PTBR, ROUTES} from "../../common/constants";
import {getCurrentUserMock} from "../../tests-setup";
import Home from "../public/home/Home";
import Dashboard from "../protected/Dashboard";
import Layout from "./Layout";

describe("Layout", () => {
  const setupComponent = (): void => {
    render(
      <MemoryRouter initialEntries={[ROUTES.HOME]}>
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
  };

  test("should navigate to dashboard if currentUser is available", async () => {
    getCurrentUserMock.mockResolvedValue({data: LOGGEDUSER});
    setupComponent();
    await waitFor(() => {
      expect(getCurrentUserMock).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: PTBR.PAGES.DASHBOARD.TITLE,
          level: 1,
        }),
      ).toBeInTheDocument();
      expect(screen.getByText(`${PTBR.PAGES.DASHBOARD.WELCOME} ${LOGGEDUSER.name}`)).toBeInTheDocument();
    });
  });

  test("should navigate to home if currentUser is not available", async () => {
    getCurrentUserMock.mockResolvedValue({data: undefined});
    setupComponent();
    await waitFor(() => {
      expect(getCurrentUserMock).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(screen.getByText(PTBR.COMPONENTS.HERO.TITLE)).toBeInTheDocument();
    });
  });
});
