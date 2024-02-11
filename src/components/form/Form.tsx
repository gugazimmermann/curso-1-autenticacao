import {type FormProps} from "../../common/interfaces/components";
import Alert from "../alert/Alert";
import Loading from "../loading/Loading";

const Form = ({loading, alert, onSubmit, className, children}: FormProps): JSX.Element => {
  return (
    <form
      onSubmit={async e => {
        await onSubmit(e);
      }}
      className={className}>
      {loading && <Loading />}
      {alert && <Alert type={alert.type} text={alert.text} />}
      {children}
    </form>
  );
};

export default Form;
