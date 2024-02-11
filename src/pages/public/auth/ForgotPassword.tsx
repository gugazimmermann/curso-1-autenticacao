import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {type ForgotPasswordValues} from "../../../common/interfaces/auth";
import {type AlertProps} from "../../../common/interfaces/components";
import {PTBR, ROUTES} from "../../../common/constants";
import {Auth} from "../../../services";
import {isUser} from "../../../common/helpers";
import {EmailIcon} from "../../../icons";
import {AuthLink} from "../../../components";
import {validateEmail} from "../../utils/validation";
import AuthLayout from "./AuthLayout";
import AuthForm from "./AuthForm";

const ForgotPassword = (): JSX.Element => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();
  const [values, setValues] = useState<ForgotPasswordValues>({
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setAlert(undefined);
    if (!validateEmail(values.email, setAlert)) {
      setLoading(false);
      return;
    }
    const response = await Auth.forgotPassword(values);
    if (!isUser(response?.data)) {
      setAlert({
        type: "error",
        text: PTBR.AUTH.EMAILNOTFOUND,
      });
    } else {
      console.log({code: response.data.code});
      navigate(`${ROUTES.NEW_PASSWORD}/${values.email}`);
    }
    setLoading(false);
  };

  return (
    <AuthLayout title={PTBR.PAGES.FORGOTPASSWORD.TITLE}>
      <AuthForm<ForgotPasswordValues>
        loading={loading}
        alert={alert}
        submitText={PTBR.PAGES.FORGOTPASSWORD.BUTTON}
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
        ]}>
        <AuthLink route={ROUTES.LOGIN} text={PTBR.AUTH.LINKBACKTOLOGIN} />
      </AuthForm>
    </AuthLayout>
  );
};

export default ForgotPassword;
