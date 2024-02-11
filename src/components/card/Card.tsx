import {type CardProps} from "../../common/interfaces/components";

const Card = ({title, color, children}: CardProps): JSX.Element => {
  const handleColor = (color?: string): string => {
    switch (color) {
      case "primary":
        return "bg-primary-100";
      case "secondary":
        return "bg-secondary-100";
      case "success":
        return "bg-success-100";
      case "info":
        return "bg-info-100";
      case "warning":
        return "bg-warning-100";
      case "danger":
        return "bg-danger-100";
      default:
        return "bg-white";
    }
  };

  return (
    <div className={`${handleColor(color)} p-2 rounded-md shadow-md w-full`}>
      <h2 className="text-lg font-semibold text-text-700 uppercase">{title}</h2>
      {children}
    </div>
  );
};

export default Card;
