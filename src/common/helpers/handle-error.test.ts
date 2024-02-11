import handleError from "./handle-error";

describe("handleError", () => {
  test("should return the error message", () => {
    expect(handleError(new Error("Test error"))).toBe("Test error");
  });

  test("should return string", () => {
    expect(handleError("Not an error")).toBe("Not an error");
  });
});
