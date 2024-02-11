import {type AuthLayoutProps} from "../../../common/interfaces/pages";

const AuthLayout = ({title, children}: AuthLayoutProps): JSX.Element => {
  return (
    <section className="container flex justify-center">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
        <div className="flex justify-center mt-4">
          <img className="w-auto h-12" src={process.env.PUBLIC_URL + "/images/logo.png"} alt="logo" />
        </div>
        <div className="flex items-center justify-center mt-6">
          <h1 className="w-full sm:w-1/2 md:w-1/3 pb-2 font-medium text-center text-text-900 capitalize border-b-2 border-primary-500">
            {title}
          </h1>
        </div>
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
