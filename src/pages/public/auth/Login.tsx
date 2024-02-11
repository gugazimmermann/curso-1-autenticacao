import {useState} from "react";
import {type LoginValues} from "../../../common/interfaces/auth";
import {type AlertProps} from "../../../common/interfaces/components";
import {PTBR, ROUTES} from "../../../common/constants";
import {EmailIcon, PasswordIcon} from "../../../icons";
import {AuthLink} from "../../../components";
import AuthLayout from "./AuthLayout";
import AuthForm from "./AuthForm";

const Login = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();
  const [values, setValues] = useState<LoginValues>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setAlert(undefined);
    console.log(values);
    setLoading(false);
  };

  return (
    <AuthLayout title={PTBR.PAGES.LOGIN.TITLE}>
      <AuthForm<LoginValues>
        loading={loading}
        alert={alert}
        submitText={PTBR.PAGES.LOGIN.BUTTON}
        onSubmit={async e => {
          await handleSubmit(e);
        }}
        values={values}
        setValues={setValues}
        inputs={[
          {
            required: true,
            autocomplete: "email",
            type: "email",
            placeholder: PTBR.AUTH.EMAIL,
            icon: <EmailIcon />,
            value: "email",
          },
          {
            required: true,
            type: "password",
            placeholder: PTBR.AUTH.PASSWORD,
            icon: <PasswordIcon />,
            value: "password",
          },
        ]}>
        <>
          <AuthLink route={ROUTES.FORGOT_PASSWORD} text={PTBR.AUTH.LINKFORGOTPASSWORD} />
          <AuthLink route={ROUTES.REGISTER} text={PTBR.AUTH.LINKREGISTER} />
          <AuthLink route={ROUTES.VERIFY_EMAIL} text={PTBR.AUTH.LINKFORGOTPASSWORD} />
        </>
      </AuthForm>
    </AuthLayout>
  );
};

export default Login;
