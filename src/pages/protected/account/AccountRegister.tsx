import {useState} from "react";
import {useAuth} from "../../../context/AuthContext";
import {Auth} from "../../../services";
import {type AccountUpdateValues} from "../../../common/interfaces/auth";
import {type AlertProps} from "../../../common/interfaces/components";
import {isUser} from "../../../common/helpers";
import {validateName, validateEmail} from "../../utils/validation";
import {Form, Input} from "../../../components/form";
import {Button, Card} from "../../../components";
import {PTBR} from "../../../common/constants";

const AccountRegister = (): JSX.Element => {
  const {state, dispatch} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();
  const [values, setValues] = useState<AccountUpdateValues>({
    name: String(state.user?.name),
    email: String(state.user?.email),
  });

  const validate = (values: AccountUpdateValues): boolean => {
    if (!validateName(values.name, setAlert)) {
      setLoading(false);
      return false;
    }
    if (!validateEmail(values.email, setAlert)) {
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
    const response = await Auth.updateUser(values);
    if (!isUser(response?.data)) {
      setAlert({
        type: "error",
        text: PTBR.AUTH.CHANGEUSERDATAERROR,
      });
    } else {
      if (response.data.verified) {
        setAlert({
          type: "success",
          text: PTBR.AUTH.CHANGEUSERDATASUCCESS,
        });
      } else {
        console.log({code: response.data.code});
        setAlert({
          type: "warning",
          text: PTBR.AUTH.CHANGEUSERDATAEMAIL,
        });
      }
      dispatch({
        type: "UPDATE_USER",
        payload: {
          user: {
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
          },
        },
      });
    }
    setLoading(false);
  };

  return (
    <Card title={PTBR.PAGES.ACCOUNT.USERDATA.TITLE}>
      <Form loading={loading} alert={alert} onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <>
          <Input
            disabled={loading}
            required={true}
            autocomplete="name"
            type="text"
            label={PTBR.AUTH.NAME}
            placeholder={PTBR.AUTH.NAME}
            value="name"
            values={values}
            setValues={setValues}
          />
          <Input
            disabled={loading}
            required={true}
            autocomplete="email"
            type="email"
            label={PTBR.AUTH.EMAIL}
            placeholder={PTBR.AUTH.EMAIL}
            value="email"
            values={values}
            setValues={setValues}
          />
          <div className="flex justify-end">
            <Button
              size="w-1/3"
              testid="account-register-submit-button"
              text={PTBR.PAGES.ACCOUNT.USERDATA.BUTTON}
              type="submit"
            />
          </div>
        </>
      </Form>
    </Card>
  );
};

export default AccountRegister;
