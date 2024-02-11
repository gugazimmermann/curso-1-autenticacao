import {Link} from "react-router-dom";
import {type LogoProps} from "../../../common/interfaces/components";
import {ROUTES} from "../../../common/constants";

const Logo = ({image}: LogoProps): JSX.Element => {
  return (
    <Link to={ROUTES.HOME} className="flex flex-row items-center">
      {image && <img className="w-auto h-8 mr-2" src={process.env.PUBLIC_URL + "/images/logo.png"} alt="Logo" />}
      <span className="text-xl font-bold">{String(process.env.REACT_APP_SITE_TITLE)}</span>
    </Link>
  );
};

export default Logo;
