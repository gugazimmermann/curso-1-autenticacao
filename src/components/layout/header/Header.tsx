import {useMemo} from "react";
import {PTBR, ROUTES} from "../../../common/constants";
import {LoginIcon} from "../../../icons";
import Logo from "../logo/Logo";
import NavLink from "./NavLink";

const Header = (): JSX.Element => {
  const navItems = useMemo(
    () => [
      {
        route: ROUTES.HOME,
        content: PTBR.LAYOUT.MENU.HOME,
      },
      {
        route: ROUTES.BLOG,
        content: PTBR.LAYOUT.MENU.BLOG,
      },
      {
        route: ROUTES.LOGIN,
        content: <LoginIcon />,
      },
    ],
    [],
  );

  return (
    <div>
      <header className="w-full py-2 px-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between">
        <Logo image={true} />
        <nav className="mt-4 sm:mt-0 flex flex-row gap-8">
          {navItems.map(item => (
            <NavLink key={item.route} route={item.route} content={item.content} />
          ))}
        </nav>
      </header>
      <hr className="border-background-300" />
    </div>
  );
};

export default Header;
