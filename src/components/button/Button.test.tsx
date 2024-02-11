import {render, screen, fireEvent} from "@testing-library/react";
import {type ButtonProps} from "../../common/interfaces/components";
import Button from "./Button";

const buttons: Array<Partial<ButtonProps>> = [
  {text: ""},
  {
    text: "Button Primary",
    color: "primary",
  },
  {
    text: "Button Secondary",
    color: "secondary",
  },
  {
    text: "Button Success",
    color: "success",
  },
  {
    text: "Button Info",
    color: "info",
  },
  {
    text: "Button Warning",
    color: "warning",
  },
  {
    text: "Button Danger",
    color: "danger",
  },
];

describe("Button", () => {
  const setupComponent = (props: Partial<ButtonProps> = {}): void => {
    const defaultProps: ButtonProps = {
      testid: "button-test",
      text: "Button Test",
    };
    const mergedProps = {...defaultProps, ...props};
    render(<Button {...mergedProps} />);
  };

  test("renders a disabled button", () => {
    setupComponent({disabled: true});
    expect(screen.getByTestId("button-test")).toBeDisabled();
  });

  buttons.forEach(button => {
    test(`renders a button with right text and color ${button.color}`, () => {
      setupComponent(button);
      const renderedButton = screen.getByTestId("button-test");
      expect(renderedButton).toHaveTextContent(button.text ? button.text : "Click Here");
      expect(renderedButton).toHaveClass(button.color ? `bg-${button.color}-500` : "bg-primary-500");
    });
  });

  test("calls onClick handler when clicked", () => {
    const onClickMock = jest.fn();
    setupComponent({
      onClick: onClickMock,
    });
    fireEvent.click(screen.getByTestId("button-test"));
    expect(onClickMock).toHaveBeenCalled();
  });
});
