import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {PTBR, ROUTES} from "../../common/constants";
import * as services from "../../services/auth";
import Home from "../public/home/Home";
import Dashboard from "../protected/Dashboard";
import Layout from "./Layout";

jest.mock("../../services/auth", () => ({
  ...jest.requireActual("../../services/auth"),
  getCurrentUser: jest.fn(),
}));

describe("Layout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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
    const data = {
      id: "0cee0dcc-3160-4e0f-a01a-6f2742ed9289",
      name: "Test User",
      email: "test@test.com",
      verified: true,
    };
    require("../../services/auth").getCurrentUser.mockResolvedValue({
      data,
    });
    setupComponent();
    await waitFor(() => {
      expect(services.getCurrentUser).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: PTBR.PAGES.DASHBOARD.TITLE,
          level: 1,
        }),
      ).toBeInTheDocument();
      expect(screen.getByText(`${PTBR.PAGES.DASHBOARD.WELCOME} ${data.name}`)).toBeInTheDocument();
    });
  });

  test("should navigate to home if currentUser is not available", async () => {
    require("../../services/auth").getCurrentUser.mockResolvedValue(null);
    setupComponent();
    await waitFor(() => {
      expect(services.getCurrentUser).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(screen.getByText(PTBR.COMPONENTS.HERO.TITLE)).toBeInTheDocument();
    });
  });
});
