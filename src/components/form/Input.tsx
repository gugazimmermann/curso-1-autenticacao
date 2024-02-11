import {type InputProps} from "../../common/interfaces/components";

const Input = <T,>({
  disabled,
  required,
  autocomplete,
  type,
  label,
  placeholder,
  icon,
  value,
  values,
  setValues,
}: InputProps<T>): JSX.Element => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm ml-1" htmlFor={String(value)}>
          {label}
        </label>
      )}
      <div className={`relative flex items-center ${label && "mt-1"}`}>
        {icon !== undefined && <span className="absolute ml-2">{icon}</span>}
        <input
          type={type ?? "text"}
          disabled={disabled}
          required={required}
          autoComplete={autocomplete}
          name={String(value)}
          id={String(value)}
          placeholder={placeholder}
          value={String(values[value])}
          onChange={e => {
            setValues({...values, [value]: e.target.value});
          }}
          className={`${
            icon !== undefined ? "px-10 py-2" : "p-2"
          } block w-full border border-background-300 rounded-md focus:border-primary-500 focus:ring-primary-200 focus:ring-opacity-40 focus:outline-none focus:ring`}
        />
      </div>
    </div>
  );
};

export default Input;
