import {Link} from "react-router-dom";
import {type AuthLinkProps} from "../../common/interfaces/components";

const AuthLink = ({route, text}: AuthLinkProps): JSX.Element => {
  return (
    <Link to={route} className="text-sm text-primary-500 hover:underline">
      {text}
    </Link>
  );
};

export default AuthLink;
