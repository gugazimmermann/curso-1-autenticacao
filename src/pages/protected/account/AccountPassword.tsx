import {useState} from "react";
import {Auth} from "../../../services";
import {type AccountPasswordValues} from "../../../common/interfaces/auth";
import {type AlertProps} from "../../../common/interfaces/components";
import {PTBR} from "../../../common/constants";
import {isUser} from "../../../common/helpers";
import {validatePassword} from "../../utils/validation";
import {Form, Input} from "../../../components/form";
import {Button, Card} from "../../../components";

const AccountPassword = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();
  const [values, setValues] = useState<AccountPasswordValues>({
    password: "",
    newpassword: "",
    repeatpassword: "",
  });

  const validate = (values: AccountPasswordValues): boolean => {
    if (!validatePassword(values.password, values.password, setAlert)) {
      setLoading(false);
      return false;
    }
    if (!validatePassword(values.newpassword, values.repeatpassword, setAlert)) {
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
    const response = await Auth.updatePassword(values);
    if (!isUser(response?.data)) {
      setAlert({
        type: "error",
        text: PTBR.AUTH.PASSWORDCHANGEERROR,
      });
    } else {
      setAlert({
        type: "success",
        text: PTBR.AUTH.PASSWORDCHANGESUCCESS,
      });
    }
    setLoading(false);
  };

  return (
    <Card title={PTBR.PAGES.ACCOUNT.CHANGEPASSWORD.TITLE}>
      <Form loading={loading} alert={alert} onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <>
          <Input
            disabled={loading}
            required={true}
            type="password"
            label={PTBR.AUTH.CURRENTPASSWORD}
            placeholder={PTBR.AUTH.CURRENTPASSWORD}
            value="password"
            values={values}
            setValues={setValues}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              disabled={loading}
              required={true}
              type="password"
              label={PTBR.AUTH.NEWPASSWORD}
              placeholder={PTBR.AUTH.NEWPASSWORD}
              value="newpassword"
              values={values}
              setValues={setValues}
            />
            <Input
              disabled={loading}
              required={true}
              type="password"
              label={PTBR.AUTH.REPEATNEWPASSWORD}
              placeholder={PTBR.AUTH.REPEATNEWPASSWORD}
              value="repeatpassword"
              values={values}
              setValues={setValues}
            />
          </div>
          <div className="flex justify-end">
            <Button
              size="w-1/3"
              testid="account-password-submit-button"
              text={PTBR.PAGES.ACCOUNT.CHANGEPASSWORD.BUTTON}
              type="submit"
            />
          </div>
        </>
      </Form>
    </Card>
  );
};

export default AccountPassword;
