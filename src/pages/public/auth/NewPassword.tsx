import {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {type NewPasswordValues} from "../../../common/interfaces/auth";
import {type AlertProps} from "../../../common/interfaces/components";
import {PTBR, ROUTES} from "../../../common/constants";
import {Auth} from "../../../services";
import {isUser} from "../../../common/helpers";
import {EmailIcon, PasswordIcon} from "../../../icons";
import {AuthLink} from "../../../components";
import {validateCode, validateEmail, validatePassword} from "../../utils/validation";
import AuthLayout from "./AuthLayout";
import AuthForm from "./AuthForm";

const NewPassword = (): JSX.Element => {
  const navigate = useNavigate();
  const {email} = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();
  const [values, setValues] = useState<NewPasswordValues>({
    email: email ?? "",
    code: "",
    password: "",
    repeatpassword: "",
  });

  const validate = (values: NewPasswordValues): boolean => {
    if (!validateEmail(values.email, setAlert)) {
      setLoading(false);
      return false;
    }
    if (!validateCode(values.code, setAlert)) {
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
    const response = await Auth.newPassword(values);
    if (!isUser(response?.data)) {
      setAlert({
        type: "error",
        text: response.data === "Unverified" ? PTBR.AUTH.EMAILUNVERIFIED : PTBR.AUTH.USERUNAUTHORIZED,
      });
    } else {
      navigate(`${ROUTES.LOGIN}/${values.email}`);
    }
    setLoading(false);
  };

  return (
    <AuthLayout title={PTBR.PAGES.NEWPASSWORD.TITLE}>
      <AuthForm<NewPasswordValues>
        loading={loading}
        alert={alert}
        submitText={PTBR.PAGES.NEWPASSWORD.BUTTON}
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
            type: "text",
            placeholder: PTBR.AUTH.CODE,
            icon: <PasswordIcon />,
            value: "code",
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
        <AuthLink route={ROUTES.LOGIN} text={PTBR.AUTH.LINKBACKTOLOGIN} />
      </AuthForm>
    </AuthLayout>
  );
};

export default NewPassword;
