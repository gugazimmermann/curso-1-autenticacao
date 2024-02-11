import {type IconProps} from "../common/interfaces/components";

const LoaderIcon = ({size, color}: IconProps): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${size ?? "w-12 h-12"} ${color ?? "text-primary-500"} animate-spin`}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      data-testid="loader">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
};

export default LoaderIcon;
