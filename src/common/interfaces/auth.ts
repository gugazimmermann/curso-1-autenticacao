import {type IUser} from "./user";

interface AuthBaseValues {
  email: string;
}

export interface LoginValues extends AuthBaseValues {
  password: string;
}

export interface RegisterValues extends LoginValues {
  name: string;
  repeatpassword: string;
}

export interface VerifyEmailValues extends AuthBaseValues {
  code: string;
}

export interface ReSendCodeValues extends AuthBaseValues {}

export interface ForgotPasswordValues extends AuthBaseValues {}

export interface NewPasswordValues extends VerifyEmailValues, Omit<RegisterValues, "name"> {}

export interface ICode {
  userId: IUser["id"];
  code: VerifyEmailValues["code"];
  date: number;
}
