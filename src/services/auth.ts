import {
  type ForgotPasswordValues,
  type LoginValues,
  type NewPasswordValues,
  type ReSendCodeValues,
  type RegisterValues,
  type VerifyEmailValues,
} from "../common/interfaces/auth";
import {type IUserResult} from "../common/interfaces/user";
import * as API from "../common/api";
import {handleError} from "../common/helpers";

const handleApiRequest = async (apiFunction: () => Promise<any>): Promise<IUserResult> => {
  try {
    const {data} = await apiFunction();
    return {data};
  } catch (error) {
    return {error: handleError(error)};
  }
};

export const register = async (data: RegisterValues): Promise<IUserResult> => {
  return await handleApiRequest(async () => await API.Auth.register(data));
};

export const verifyEmail = async (data: VerifyEmailValues): Promise<IUserResult> => {
  return await handleApiRequest(async () => await API.Auth.verifyEmail(data));
};

export const reSendCode = async (data: ReSendCodeValues): Promise<IUserResult> => {
  return await handleApiRequest(async () => await API.Auth.reSendCode(data));
};

export const forgotPassword = async (data: ForgotPasswordValues): Promise<IUserResult> => {
  return await handleApiRequest(async () => await API.Auth.forgotPassword(data));
};

export const newPassword = async (data: NewPasswordValues): Promise<IUserResult> => {
  return await handleApiRequest(async () => await API.Auth.newPassword(data));
};

export const login = async (data: LoginValues): Promise<IUserResult> => {
  return await handleApiRequest(async () => await API.Auth.login(data));
};

export const logout = (): void => {
  localStorage.removeItem("token");
};

export const getCurrentUser = async (): Promise<IUserResult | null> => {
  const token = localStorage.getItem("token");
  return token ? await handleApiRequest(async () => await API.Auth.getUser(token)) : null;
};
