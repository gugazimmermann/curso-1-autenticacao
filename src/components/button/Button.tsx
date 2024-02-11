import {type ButtonProps} from "../../common/interfaces/components";

const Button = ({text, onClick}: ButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className="px-4 py-2 mt-4 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-secondary-500 rounded-lg hover:bg-primary-500 focus:outline-none focus:bg-primary-500"
      onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
