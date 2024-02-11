import {render, screen, fireEvent} from "@testing-library/react";
import {type InputProps} from "../../common/interfaces/components";
import {AlertInfoIcon} from "../../icons";
import Input from "./Input";

describe("Input", () => {
  const setupComponent = (
    props: Partial<
      InputProps<{
        name: string;
      }>
    > = {},
  ): void => {
    const defaultProps: InputProps<{
      name: string;
    }> = {
      label: "Name",
      placeholder: "Enter your Name",
      value: "name",
      values: {name: ""},
      setValues: jest.fn(),
    };
    const mergedProps = {...defaultProps, ...props};
    render(<Input {...mergedProps} />);
  };

  test("handles input change", () => {
    const setTestValues = jest.fn();
    setupComponent({setValues: setTestValues});
    const inputElement = screen.getByPlaceholderText("Enter your Name");
    fireEvent.change(inputElement, {target: {value: "User Test"}});
    expect(setTestValues).toHaveBeenCalledWith({name: "User Test"});
  });

  test("renders input component with icon", () => {
    setupComponent({icon: <AlertInfoIcon />});
    expect(screen.getByTestId("alert-info-icon")).toBeInTheDocument();
  });
});
