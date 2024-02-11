import {NavLink as MenuLink} from "react-router-dom";
import {type NavLinkProps} from "../../../common/interfaces/components";

const NavLink = ({route, content}: NavLinkProps): JSX.Element => {
  return (
    <MenuLink
      to={route}
      className={({isActive}) =>
        isActive ? "text-warning-500" : "transition-colors duration-300 transform hover:text-warning-500"
      }>
      {content}
    </MenuLink>
  );
};

export default NavLink;
