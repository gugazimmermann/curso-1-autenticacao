import {useState} from "react";
import {useParams} from "react-router-dom";
import {type LoginValues} from "../../../common/interfaces/auth";
import {type AlertProps} from "../../../common/interfaces/components";
import {PTBR, ROUTES} from "../../../common/constants";
import {Auth} from "../../../services";
import {useAuth} from "../../../context/AuthContext";
import {isUser} from "../../../common/helpers";
import {EmailIcon, PasswordIcon} from "../../../icons";
import {AuthLink} from "../../../components";
import {validateEmail} from "../../utils/validation";
import AuthLayout from "./AuthLayout";
import AuthForm from "./AuthForm";

const Login = (): JSX.Element => {
  const {dispatch} = useAuth();
  const {email} = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();
  const [values, setValues] = useState<LoginValues>({
    email: email ?? "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setAlert(undefined);
    if (!validateEmail(values.email, setAlert)) {
      setLoading(false);
      return;
    }
    const response = await Auth.login(values);
    if (!isUser(response?.data)) {
      setAlert({
        type: "error",
        text: response.data === "Unverified" ? PTBR.AUTH.USERUNVERIFIED : PTBR.AUTH.USERUNAUTHORIZED,
      });
    } else {
      dispatch({
        type: "LOGIN",
        payload: {
          user: {
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
          },
          token: String(response.data.token),
        },
      });
    }
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
          <AuthLink route={ROUTES.VERIFY_EMAIL} text={PTBR.AUTH.LINKVERIFYEMAIL} />
        </>
      </AuthForm>
    </AuthLayout>
  );
};

export default Login;
