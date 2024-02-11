import {useNavigate} from "react-router-dom";
import {PTBR} from "../../common/constants";
import {Button} from "../../components";

const NoMatch = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col gap-8 justify-center items-center text-center font-bold text-white bg-primary-500">
      <h1 className="text-8xl">404</h1>
      <h4 className="text-4xl">{PTBR.LAYOUT.NOMATCH.TEXT}</h4>
      <Button
        text={PTBR.LAYOUT.NOMATCH.BUTTON}
        onClick={() => {
          navigate(-1);
        }}
      />
    </section>
  );
};

export default NoMatch;
