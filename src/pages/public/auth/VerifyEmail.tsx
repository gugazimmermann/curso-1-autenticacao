import {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {type VerifyEmailValues} from "../../../common/interfaces/auth";
import {type AlertProps} from "../../../common/interfaces/components";
import {PTBR, ROUTES} from "../../../common/constants";
import {Auth} from "../../../services";
import {isUser} from "../../../common/helpers";
import {EmailIcon, PasswordIcon} from "../../../icons";
import {AuthLink, Button} from "../../../components";
import {validateCode, validateEmail} from "../../utils/validation";
import AuthLayout from "./AuthLayout";
import AuthForm from "./AuthForm";

const VerifyEmail = (): JSX.Element => {
  const navigate = useNavigate();
  const {email} = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();
  const [values, setValues] = useState<VerifyEmailValues>({
    email: email ?? "",
    code: "",
  });

  const validate = (values: VerifyEmailValues): boolean => {
    if (!validateEmail(values.email, setAlert)) {
      setLoading(false);
      return false;
    }
    if (!validateCode(values.code, setAlert)) {
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
    const response = await Auth.verifyEmail(values);
    if (!isUser(response?.data)) {
      setAlert({
        type: "error",
        text: PTBR.AUTH.CODEERROR,
      });
    } else {
      navigate(`${ROUTES.LOGIN}/${values.email}`);
    }
    setLoading(false);
  };

  const handleReSendCode = async (): Promise<void> => {
    setLoading(true);
    setAlert(undefined);
    if (!validateEmail(values.email, setAlert)) {
      setLoading(false);
      return;
    }
    const response = await Auth.reSendCode({email: values.email});
    if (!isUser(response?.data)) {
      setAlert({
        type: "error",
        text: PTBR.AUTH.SENDCODEERROR,
      });
    } else {
      console.log({code: response.data.code});
      setAlert({
        type: "success",
        text: `${PTBR.AUTH.CODESENDED} ${values.email}`,
      });
    }
    setLoading(false);
  };

  return (
    <AuthLayout title={PTBR.PAGES.VERIFYEMAIL.TITLE}>
      <AuthForm<VerifyEmailValues>
        loading={loading}
        alert={alert}
        submitText={PTBR.PAGES.VERIFYEMAIL.BUTTON}
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
        ]}
        extraButton={
          <Button
            color="secondary"
            size="w-1/2"
            testid="verify-code-resend-button"
            type="button"
            text={PTBR.PAGES.VERIFYEMAIL.BUTTONRESEND}
            onClick={async () => {
              await handleReSendCode();
            }}
          />
        }>
        <AuthLink route={ROUTES.LOGIN} text={PTBR.AUTH.LINKBACKTOLOGIN} />
      </AuthForm>
    </AuthLayout>
  );
};

export default VerifyEmail;
