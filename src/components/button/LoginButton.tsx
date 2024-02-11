import {Link} from "react-router-dom";
import {PTBR, ROUTES} from "../../common/constants";

const LoginButton = (): JSX.Element => {
  return (
    <Link
      to={ROUTES.LOGIN}
      className="px-4 py-2 mt-2 text-sm tracking-wider text-white bg-secondary-500 rounded-lg uppercase transition-colors duration-300 transform hover:bg-primary-500 focus:outline-none focus:bg-primary-500">
      {PTBR.COMPONENTS.LOGINBUTTON.TEXT}
    </Link>
  );
};

export default LoginButton;
