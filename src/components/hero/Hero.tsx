import {PTBR} from "../../common/constants";
import LoginButton from "../button/LoginButton";

const Hero = (): JSX.Element => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col sm:flex-row items-center md:w-4/5">
        <div className="sm:w-1/2 text-center md:text-left">
          <h1 className="text-xl sm:text-3xl font-semibold">
            {PTBR.COMPONENTS.HERO.TITLE} <span className="text-blue-500 ">{PTBR.COMPONENTS.HERO.SUBTITLE}</span>
          </h1>
          <p className="my-4">{PTBR.COMPONENTS.HERO.CONTENT}</p>
          <LoginButton />
        </div>
        <div className="sm:w-1/2 mt-4 sm:mt-0">
          <img className="w-full h-auto" src={process.env.PUBLIC_URL + "/images/hero.png"} alt="hero" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
