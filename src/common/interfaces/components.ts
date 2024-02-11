import {type ROUTES} from "../constants";

export interface LogoProps {
  image?: boolean;
}

export interface NavLinkProps {
  route: (typeof ROUTES)[keyof typeof ROUTES];
  content: string | React.ReactElement;
}
