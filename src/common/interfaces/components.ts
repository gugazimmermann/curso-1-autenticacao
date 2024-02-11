import {type IUserData} from "./user";
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

export interface HeaderProps {
  user?: IUserData;
}

export interface FooterProps {
  image?: boolean;
  user?: IUserData;
}
