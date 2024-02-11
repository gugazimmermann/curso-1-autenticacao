import {
  type ICode,
  type RegisterValues,
  type VerifyEmailValues,
  type ReSendCodeValues,
  type ForgotPasswordValues,
  type NewPasswordValues,
  type LoginValues,
} from "../interfaces/auth";
import {type IUser, type IUserData, type IUserResponse} from "../interfaces/user";
import {API, JWT, delay, generateCode, generateUUID} from "./helpers";

const findUserByEmail = (email: string): IUser | undefined => {
  return API.getMock<IUser>("users").find(u => u.email === email.trim());
};

const createUserCode = (userId: IUser["id"]): string => {
  const codes = API.getMock<ICode>("codes");
  const newCode = {
    userId,
    code: generateCode(6),
    date: new Date().setDate(new Date().getDate() + 1),
  };
  API.saveMock<ICode>("codes", [...codes, newCode]);
  return newCode.code;
};

const verifyUserCode = (userId: IUser["id"], code: IUserData["code"]): string | IUserResponse => {
  const codes = API.getMock<ICode>("codes");
  const userCode = codes.filter(c => c.userId === userId && c.date > new Date().getTime());
  userCode.sort((a, b) => b.date - a.date);
  if (userCode.length === 0) return API.createError(200, "Code Not Found");
  if (userCode[0].code !== code) return API.forbidden;
  codes.splice(codes.indexOf(userCode[0]), 1);
  API.saveMock<ICode>("codes", codes);
  return userCode[0].code;
};

const saveOrUpdateUserMock = (type: "s" | "u", user: IUser): void => {
  let usersMock = API.getMock<IUser>("users");
  if (type === "u") {
    usersMock = API.updateMock<IUser>(usersMock, "id", user.id, () => user);
    API.saveMock<IUser>("users", [...usersMock]);
  } else {
    API.saveMock<IUser>("users", [...usersMock, user]);
  }
};

export const register = async (data: RegisterValues): Promise<IUserResponse> => {
  await delay(500);
  const exists = findUserByEmail(data.email);
  if (exists) return API.createError(200, "Already Registered");
  const newUser: IUser = {
    id: generateUUID(),
    name: data.name,
    email: data.email.trim(),
    password: data.password,
    verified: false,
  };
  const code = createUserCode(newUser.id);
  saveOrUpdateUserMock("s", newUser);
  const {password, ...userData} = newUser;
  return API.handleResponse<IUserData, IUserResponse>(200, {...userData, code});
};

export const verifyEmail = async (data: VerifyEmailValues): Promise<IUserResponse> => {
  await delay(500);
  const user = findUserByEmail(data.email);
  if (!user) return API.notFound;
  const verifyCode = verifyUserCode(user.id, data.code);
  if (typeof verifyCode !== "string") return verifyCode;
  saveOrUpdateUserMock("u", {...user, verified: true});
  return API.handleResponse<IUserData, IUserResponse>(200, user);
};

export const reSendCode = async ({email}: ReSendCodeValues): Promise<IUserResponse> => {
  await delay(500);
  const user = findUserByEmail(email);
  if (!user) return API.notFound;
  const code = createUserCode(user.id);
  saveOrUpdateUserMock("u", {...user, verified: false});
  return API.handleResponse<IUserData, IUserResponse>(200, {...user, code});
};

export const forgotPassword = async ({email}: ForgotPasswordValues): Promise<IUserResponse> => {
  await delay(500);
  const user = findUserByEmail(email);
  if (!user) return API.notFound;
  if (!user.verified) return API.forbidden;
  const code = createUserCode(user.id);
  return API.handleResponse<IUserData, IUserResponse>(200, {...user, code});
};

export const newPassword = async (data: NewPasswordValues): Promise<IUserResponse> => {
  await delay(500);
  const user = findUserByEmail(data.email);
  if (!user) return API.notFound;
  if (!user.verified) return API.forbidden;
  const verifyCode = verifyUserCode(user.id, data.code);
  if (typeof verifyCode !== "string") return verifyCode;
  if (verifyCode !== data.code || data.password.length < 6 || data.password !== data.repeatpassword) {
    return API.forbidden;
  }
  saveOrUpdateUserMock("u", {...user, password: data.password});
  return API.handleResponse<IUserData, IUserResponse>(200, user);
};

export const login = async (data: LoginValues): Promise<IUserResponse> => {
  await delay(500);
  const user = findUserByEmail(data.email);
  if (!user) return API.notFound;
  if (!user.verified) return API.forbidden;
  if (user.password !== data.password) return API.unauthorized;
  const {password, ...userData} = user;
  return API.handleResponse<IUserData, IUserResponse>(200, {
    ...userData,
    token: JWT.generateJWT(user.id),
  });
};

export const getUser = async (token: string): Promise<IUserResponse> => {
  await delay(500);
  const users = API.getMock<IUser>("users");
  const {id} = JWT.verifyJWT(token);
  const user = users.find(u => u.id === id);
  if (!user) return API.notFound;
  const {password, ...userData} = user;
  return API.handleResponse<IUserData, IUserResponse>(200, userData);
};
