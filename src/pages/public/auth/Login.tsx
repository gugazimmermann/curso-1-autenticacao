import {PTBR} from "../../../common/constants";
import {Title} from "../../../components/layout";

const Login = (): JSX.Element => {
  return (
    <section className="w-full">
      <Title title={PTBR.PAGES.LOGIN.TITLE} />
    </section>
  );
};

export default Login;
