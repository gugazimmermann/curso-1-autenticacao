import {type AlertProps} from "../../common/interfaces/components";
import {AlertErrorIcon, AlertInfoIcon, AlertSuccessIcon, AlertWarningIcon} from "../../icons";

const Alert = ({type, text}: AlertProps): JSX.Element => {
  const alertTypeMappings = {
    info: {
      title: "Info",
      titleColor: "bg-info-500",
      bg: "bg-info-100",
      textColor: "text-info-500",
    },
    warning: {
      title: "Alerta",
      titleColor: "bg-warning-500",
      bg: "bg-warning-100",
      textColor: "text-warning-500",
    },
    error: {
      title: "Erro",
      titleColor: "bg-danger-500",
      bg: "bg-danger-100",
      textColor: "text-danger-500",
    },
    success: {
      title: "Sucesso",
      titleColor: "bg-success-500",
      bg: "bg-success-100",
      textColor: "text-success-500",
    },
  };

  const {title, titleColor, bg, textColor} = alertTypeMappings[type];

  return (
    <div className={`flex w-full rounded-lg shadow-md mb-4 ${bg}`}>
      <div className={`flex items-center justify-center w-12 rounded-l-lg ${titleColor}`}>
        {(() => {
          switch (type) {
            case "info":
              return <AlertInfoIcon />;
            case "warning":
              return <AlertWarningIcon />;
            case "error":
              return <AlertErrorIcon />;
            default:
              return <AlertSuccessIcon />;
          }
        })()}
      </div>
      <div className="px-4 py-2">
        <span className={`font-semibold text-sm ${textColor}`}>{title}</span>
        <p className="text-text-900">{text}</p>
      </div>
    </div>
  );
};

export default Alert;
