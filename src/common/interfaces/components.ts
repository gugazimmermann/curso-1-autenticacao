import {type ROUTES} from "../constants";

export interface LogoProps {
  image?: boolean;
}

export interface NavLinkProps {
  route: (typeof ROUTES)[keyof typeof ROUTES];
  content: string | React.ReactElement;
}

export interface TitleProps {
  title: string;
}

export interface IconProps {
  size?: string;
  color?: string;
}

export interface ButtonProps {
  color?: "primary" | "secondary" | "success" | "info" | "warning" | "danger";
  size?: "w-1/4" | "w-1/3" | "w-1/2" | "w-full";
  disabled?: boolean;
  testid?: string;
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export interface FooterProps {
  image?: boolean;
}

export interface AlertProps {
  type: "success" | "info" | "warning" | "error";
  text: string;
}

export interface InputProps<T> {
  disabled?: boolean;
  required?: boolean;
  autocomplete?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  value: keyof T;
  values: T;
  setValues: React.Dispatch<React.SetStateAction<T>>;
}

export interface FormProps {
  loading?: boolean;
  alert?: AlertProps;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  className?: string;
  children: React.ReactElement;
}

export interface AuthLinkProps {
  route: (typeof ROUTES)[keyof typeof ROUTES];
  text: string;
}

export interface CardProps {
  title: string;
  color?: "primary" | "secondary" | "success" | "info" | "warning" | "danger";
  children: React.ReactElement;
}
