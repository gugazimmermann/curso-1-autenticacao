import {render, screen, waitFor} from "@testing-library/react";
import {PTBR} from "../../common/constants";
import * as layout from "../layout/Layout";
import Dashboard from "./Dashboard";

jest.mock("../layout/Layout", () => ({
  ...jest.requireActual("../layout/Layout"),
  useUser: jest.fn(),
}));

const userData = {
  id: "0cee0dcc-3160-4e0f-a01a-6f2742ed9289",
  name: "Test User",
  email: "test@test.com",
  verified: true,
};

describe("Dashboard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Dashboard should have title and not have user name", async () => {
    require("../layout/Layout").useUser.mockResolvedValue();
    render(<Dashboard />);
    expect(
      screen.getByRole("heading", {
        name: PTBR.PAGES.DASHBOARD.TITLE,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText(`${PTBR.PAGES.DASHBOARD.WELCOME} ${userData.name}`)).not.toBeInTheDocument();
  });

  test("Dashboard should have user name", async () => {
    require("../layout/Layout").useUser.mockReturnValue({userData});
    render(<Dashboard />);
    await waitFor(() => {
      expect(layout.useUser).toHaveBeenCalledTimes(1);
    });
    expect(
      screen.getByRole("heading", {
        name: PTBR.PAGES.DASHBOARD.TITLE,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(`${PTBR.PAGES.DASHBOARD.WELCOME} ${userData.name}`)).toBeInTheDocument();
  });
});
