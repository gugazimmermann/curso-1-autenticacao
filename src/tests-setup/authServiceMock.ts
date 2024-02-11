import {type IUserResult} from "../common/interfaces/user";
import * as auth from "../services/auth";

jest.mock("../services/auth", () => ({
  ...jest.requireActual("../services/auth"),
  register: jest.fn(),
  verifyEmail: jest.fn(),
  reSendCode: jest.fn(),
  forgotPassword: jest.fn(),
  newPassword: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
  getCurrentUser: jest.fn(),
  updatePassword: jest.fn(),
  updateUser: jest.fn(),
}));

export const registerMock = auth.register as jest.Mock<Promise<IUserResult>>;
export const verifyEmailMock = auth.verifyEmail as jest.Mock<Promise<IUserResult>>;
export const reSendCodeMock = auth.reSendCode as jest.Mock<Promise<IUserResult>>;
export const forgotPasswordMock = auth.forgotPassword as jest.Mock<Promise<IUserResult>>;
export const newPasswordMock = auth.newPassword as jest.Mock<Promise<IUserResult>>;
export const loginMock = auth.login as jest.Mock<Promise<IUserResult>>;
export const logoutMock = auth.logout as jest.Mock<void>;
export const getCurrentUserMock = auth.getCurrentUser as jest.Mock<Promise<IUserResult>>;
export const updatePassword = auth.updatePassword as jest.Mock<Promise<IUserResult>>;
export const updateUser = auth.updateUser as jest.Mock<Promise<IUserResult>>;
