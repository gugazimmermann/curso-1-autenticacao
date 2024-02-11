import {type ButtonProps} from "../../common/interfaces/components";

const Button = ({color, size = "w-1/4", disabled, testid, text, type, onClick}: ButtonProps): JSX.Element => {
  const handleColor = (color?: string): string => {
    switch (color) {
      case "primary":
        return "bg-primary-500 hover:bg-primary-700 focus:bg-primary-600";
      case "secondary":
        return "bg-secondary-500 hover:bg-secondary-700 focus:bg-secondary-600";
      case "success":
        return "bg-success-500 hover:bg-success-700 focus:bg-success-600";
      case "info":
        return "bg-info-500 hover:bg-info-700 focus:bg-info-600";
      case "warning":
        return "bg-warning-500 hover:bg-warning-700 focus:bg-warning-600";
      case "danger":
        return "bg-danger-500 hover:bg-danger-700 focus:bg-danger-600";
      default:
        return "bg-primary-500 hover:bg-primary-700 focus:bg-primary-600";
    }
  };

  return (
    <button
      disabled={disabled}
      data-testid={testid}
      type={type ?? "button"}
      className={`${handleColor(
        color,
      )} ${size} py-1 rounded-md text-white transition-colors duration-300 transform focus:outline-none`}
      onClick={onClick}>
      {text.trim() !== "" ? text : "Click Here"}
    </button>
  );
};

export default Button;
