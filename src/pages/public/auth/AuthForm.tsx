import {type AuthFormProps} from "../../../common/interfaces/pages";
import {Form, Input} from "../../../components/form";
import {Button} from "../../../components";

const AuthForm = <T,>({
  loading,
  alert,
  submitText,
  onSubmit,
  values,
  setValues,
  inputs,
  extraButton,
  children,
}: AuthFormProps<T>): JSX.Element => {
  return (
    <Form loading={loading} alert={alert} onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
      <>
        {inputs.map(input => (
          <Input<T>
            key={String(input.value)}
            disabled={loading}
            required={input.required}
            autocomplete={input.autocomplete}
            type={input.type}
            placeholder={input.placeholder}
            icon={input.icon}
            value={input.value}
            values={values}
            setValues={setValues}
          />
        ))}
        <div className="flex flex-row gap-4">
          {extraButton ?? extraButton}
          <Button
            testid="auth-submit-button"
            type="submit"
            text={submitText}
            size={extraButton !== undefined ? "w-1/2" : "w-full"}
          />
        </div>
        <div className="flex flex-col gap-4 items-center">{children}</div>
      </>
    </Form>
  );
};

export default AuthForm;
