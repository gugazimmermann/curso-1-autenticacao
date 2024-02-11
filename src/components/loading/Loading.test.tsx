import {render, screen} from "@testing-library/react";
import Loading from "./Loading";

describe("Loading", () => {
  test("Loading should have loader", async () => {
    render(<Loading />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("Loading should have size and color", async () => {
    render(<Loading size="w-16 h-16" color="text-red-600" />);
    expect(screen.getByTestId("loader")).toHaveClass("w-16 h-16 text-red-600 animate-spin");
  });
});
