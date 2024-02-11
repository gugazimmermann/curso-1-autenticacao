import {type FooterProps} from "../../../common/interfaces/components";
import {PTBR} from "../../../common/constants";
import {useAuth} from "../../../context/AuthContext";
import Logo from "../logo/Logo";
import LoginButton from "../../button/LoginButton";

const Footer = ({image}: FooterProps): JSX.Element => {
  const {state} = useAuth();

  return (
    <footer>
      <hr className="border-background-300" />
      <div className="p-2 flex flex-col items-center text-center">
        <Logo image={image} />
        <p className="mt-2">{`${PTBR.COMPONENTS.HERO.TITLE} ${PTBR.COMPONENTS.HERO.SUBTITLE}`}</p>
        {!state.user && <LoginButton />}
      </div>
    </footer>
  );
};

export default Footer;
