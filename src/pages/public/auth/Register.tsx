import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {type RegisterValues} from "../../../common/interfaces/auth";
import {type AlertProps} from "../../../common/interfaces/components";
import {PTBR, ROUTES} from "../../../common/constants";
import {Auth} from "../../../services";
import {isUser} from "../../../common/helpers";
import {EmailIcon, PasswordIcon, UserIcon} from "../../../icons";
import {AuthLink} from "../../../components/";
import {validateEmail, validateName, validatePassword} from "../../utils/validation";
import AuthLayout from "./AuthLayout";
import AuthForm from "./AuthForm";

const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();
  const [values, setValues] = useState<RegisterValues>({
    name: "",
    email: "",
    password: "",
    repeatpassword: "",
  });

  const validate = (values: RegisterValues): boolean => {
    if (!validateName(values.name, setAlert)) {
      setLoading(false);
      return false;
    }
    if (!validateEmail(values.email, setAlert)) {
      setLoading(false);
      return false;
    }
    if (!validatePassword(values.password, values.repeatpassword, setAlert)) {
      setLoading(false);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setAlert(undefined);
    if (!validate(values)) return;
    const response = await Auth.register(values);
    if (!isUser(response?.data)) {
      setAlert({
        type: "error",
        text: PTBR.AUTH.REGISTERERROR,
      });
    } else {
      console.log({code: response.data.code});
      navigate(`${ROUTES.VERIFY_EMAIL}/${response.data.email}`);
    }
    setLoading(false);
  };

  return (
    <AuthLayout title={PTBR.PAGES.REGISTER.TITLE}>
      <AuthForm<RegisterValues>
        loading={loading}
        alert={alert}
        submitText={PTBR.PAGES.REGISTER.BUTTON}
        onSubmit={async e => {
          await handleSubmit(e);
        }}
        values={values}
        setValues={setValues}
        inputs={[
          {
            required: true,
            autocomplete: "name",
            type: "text",
            placeholder: PTBR.AUTH.NAME,
            icon: <UserIcon />,
            value: "name",
          },
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
          {
            required: true,
            type: "password",
            placeholder: PTBR.AUTH.REPEATPASSWORD,
            icon: <PasswordIcon />,
            value: "repeatpassword",
          },
        ]}>
        <AuthLink route={ROUTES.LOGIN} text={PTBR.AUTH.LINKALREDYREGISTERED} />
      </AuthForm>
    </AuthLayout>
  );
};

export default Register;
