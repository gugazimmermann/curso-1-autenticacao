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
  text: string;
  onClick?: () => void;
}
