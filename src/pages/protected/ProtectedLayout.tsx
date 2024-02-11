import {NavLink, Outlet} from "react-router-dom";
import {PTBR, ROUTES} from "../../common/constants";

const ProtectedLayout = (): JSX.Element => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-end p-2 mb-2 bg-background-100 rounded-lg">
        <NavLink
          to={ROUTES.DASHBOARD}
          className={({isActive}) => (isActive ? "font-bold text-primary-500" : "hover:underline")}>
          {PTBR.PAGES.DASHBOARD.TITLE}
        </NavLink>
        <span className="mx-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5v14" />
          </svg>
        </span>
        <NavLink
          to={ROUTES.ACCOUNT}
          className={({isActive}) => (isActive ? "font-bold text-primary-500" : "hover:underline")}>
          {PTBR.PAGES.ACCOUNT.TITLE}
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
