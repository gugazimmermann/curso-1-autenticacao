import {render, screen} from "@testing-library/react";
import AuthLayout from "./AuthLayout";

describe("AuthLayout", () => {
  const setupComponent = (): void => {
    render(
      <AuthLayout title="Authentication">
        <div data-testid="test-children">Test Children</div>
      </AuthLayout>,
    );
  };

  test("renders with the provided title, logo and children", () => {
    setupComponent();
    expect(screen.getByText("Authentication")).toBeInTheDocument();
    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByTestId("test-children")).toBeInTheDocument();
  });
});
