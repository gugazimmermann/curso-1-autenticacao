import {type IUserData} from "../interfaces/user";

const isUser = (data?: string | IUserData | IUserData[]): data is IUserData => {
  return typeof data !== "string" && !Array.isArray(data) && typeof data?.id === "string";
};

export default isUser;
