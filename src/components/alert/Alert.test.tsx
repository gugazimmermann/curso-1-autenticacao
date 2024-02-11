import {render, screen} from "@testing-library/react";
import {type AlertProps} from "../../common/interfaces/components";
import Alert from "./Alert";

const alerts: Array<{
  type: AlertProps["type"];
  text: AlertProps["text"];
  title: string;
}> = [
  {
    type: "success",
    text: "success message",
    title: "Sucesso",
  },
  {
    type: "error",
    text: "danger message",
    title: "Erro",
  },
  {
    type: "info",
    text: "info message",
    title: "Info",
  },
  {
    type: "warning",
    text: "warning message",
    title: "Alerta",
  },
];

describe("Alert", () => {
  const setupComponent = (props: AlertProps): void => {
    render(<Alert {...props} />);
  };
  alerts.forEach(alert => {
    test(`renders ${alert.type} with correct text, color and icon`, () => {
      setupComponent(alert);
      expect(screen.getByText(alert.title)).toBeInTheDocument();
      expect(screen.getByText(alert.text)).toBeInTheDocument();
      const alertIcon = screen.getByTestId(`alert-${alert.type}-icon`);
      expect(alertIcon).toBeInTheDocument();
      expect(alertIcon.closest("div")).toHaveClass(`bg-${alert.text.split(" ")[0]}-500`);
    });
  });
});
