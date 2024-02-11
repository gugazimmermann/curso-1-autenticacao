import {type ICode} from "./auth";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  verified: boolean;
}

export interface IUserData extends Omit<IUser, "password"> {
  code?: ICode["code"];
  token?: string;
}

export interface IUserResponse {
  status: number;
  data?: string | IUserData;
}

export interface IUserResult extends Omit<IUserResponse, "status"> {
  error?: string;
}
