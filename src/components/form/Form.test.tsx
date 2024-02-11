import {render, screen, fireEvent} from "@testing-library/react";
import {type FormProps} from "../../common/interfaces/components";
import Form from "./Form";

describe("Form", () => {
  const setupComponent = (props: FormProps): void => {
    render(<Form {...props} />);
  };

  test("Form should have loading and children", async () => {
    setupComponent({
      loading: true,
      alert: undefined,
      onSubmit: jest.fn(),
      children: <h1>Test Children</h1>,
    });
    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.getByText("Test Children")).toBeInTheDocument();
  });

  test("Form should have alert", async () => {
    setupComponent({
      loading: true,
      alert: {
        type: "error",
        text: "Alert Error",
      },
      onSubmit: jest.fn(),
      children: <h1>Test Children</h1>,
    });
    expect(screen.getByText("Alert Error")).toBeInTheDocument();
  });

  test("Form should submit", () => {
    const handleSubmit = jest.fn(e => e.preventDefault());
    setupComponent({
      loading: false,
      alert: undefined,
      onSubmit: handleSubmit,
      children: <button type="submit">Submit Button</button>,
    });
    const submitButton = screen.getByText("Submit Button");
    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalled();
  });
});
