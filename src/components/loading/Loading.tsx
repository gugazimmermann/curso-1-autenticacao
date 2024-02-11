import {type IconProps} from "../../common/interfaces/components";
import {LoaderIcon} from "../../icons";

const Loading = ({size, color}: IconProps): JSX.Element => {
  return (
    <div className="flex w-full justify-center">
      <LoaderIcon size={size} color={color} />
    </div>
  );
};

export default Loading;
