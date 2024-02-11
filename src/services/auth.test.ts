import {waitFor} from "@testing-library/react";
import {type RegisterValues} from "../common/interfaces/auth";
import {type IUserData} from "../common/interfaces/user";
import * as API from "../common/api/auth";
import * as auth from "./auth";

const id = "2c9ce734-3161-41ec-8677-5d5a6c564952";
const token = "c3VhQ2hhdmVNdWl0b011aXRvU2VjcmV0YSY3MjAwJjJjOWNlNzM0LTMxNjEtNDFlYy04Njc3LTVkNWE2YzU2NDk1Mg==";
const code = "123456";
const pwd = "oldPassword";
const newPwd = "newPassword";
const userData: IUserData = {
  id,
  name: "Test",
  email: "test@test.com",
  verified: true,
};
const registerData: RegisterValues = {
  name: userData.name,
  email: userData.email,
  password: pwd,
  repeatpassword: pwd,
};
const mockResponse = {
  status: 200,
  data: userData,
};
const errorMessage = "Forbidden";
const mockError = new Error(errorMessage);

jest.mock("../common/api/auth", () => ({
  ...jest.requireActual("../common/api/auth"),
  register: jest.fn(),
  verifyEmail: jest.fn(),
  reSendCode: jest.fn(),
  forgotPassword: jest.fn(),
  newPassword: jest.fn(),
  login: jest.fn(),
  getUser: jest.fn(),
}));

describe("Auth Services", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("register should return user data", async () => {
    const data = {
      ...registerData,
      id,
      code,
      verified: false,
    };
    const {password, repeatpassword, ...result} = data;
    require("../common/api/auth").register.mockResolvedValue({
      status: 200,
      data: result,
    });
    const res = await auth.register(registerData);
    await waitFor(() => {
      expect(API.register).toHaveBeenCalledWith(registerData);
    });
    await waitFor(() => {
      expect(res).toEqual({data: result});
    });
  });

  test("verifyEmail should return user data", async () => {
    const data = {email: userData.email, code};
    require("../common/api/auth").verifyEmail.mockResolvedValue(mockResponse);
    const res = await auth.verifyEmail(data);
    await waitFor(() => {
      expect(API.verifyEmail).toHaveBeenCalledWith(data);
    });
    await waitFor(() => {
      expect(res).toEqual({data: userData});
    });
  });

  test("reSendCode should return user data", async () => {
    const data = {email: userData.email};
    require("../common/api/auth").reSendCode.mockResolvedValue(mockResponse);
    const res = await auth.reSendCode(data);
    await waitFor(() => {
      expect(API.reSendCode).toHaveBeenCalledWith(data);
    });
    await waitFor(() => {
      expect(res).toEqual({data: userData});
    });
  });

  test("forgotPassword should return user data", async () => {
    const data = {email: userData.email};
    require("../common/api/auth").forgotPassword.mockResolvedValue(mockResponse);
    const res = await auth.forgotPassword(data);
    await waitFor(() => {
      expect(API.forgotPassword).toHaveBeenCalledWith(data);
    });
    await waitFor(() => {
      expect(res).toEqual({data: userData});
    });
  });

  test("newPassword should return user data", async () => {
    const {name, ...clearRegisterData} = registerData;
    const data = {...clearRegisterData, code};
    require("../common/api/auth").newPassword.mockResolvedValue(mockResponse);
    const res = await auth.newPassword(data);
    await waitFor(() => {
      expect(API.newPassword).toHaveBeenCalledWith(data);
    });
    await waitFor(() => {
      expect(res).toEqual({data: userData});
    });
  });

  test("newPassword should handle error and return error object", async () => {
    const {name, ...clearRegisterData} = registerData;
    const data = {...clearRegisterData, repeatpassword: newPwd, code};
    require("../common/api/auth").newPassword.mockRejectedValue(mockError);
    const res = await auth.newPassword(data);
    await waitFor(() => {
      expect(API.newPassword).toHaveBeenCalledWith(data);
    });
    await waitFor(() => {
      expect(res).toEqual({error: errorMessage});
    });
  });

  test("login should return user data", async () => {
    const data = {email: userData.email, password: pwd};
    require("../common/api/auth").login.mockResolvedValue(mockResponse);
    const res = await auth.login(data);
    await waitFor(() => {
      expect(API.login).toHaveBeenCalledWith(data);
    });
    await waitFor(() => {
      expect(res).toEqual({data: userData});
    });
  });

  test("logout should remove userId", async () => {
    localStorage.setItem("token", token);
    auth.logout();
    const userToken = localStorage.getItem("token");
    expect(userToken).toBeNull();
  });

  test("getCurrentUser should return user data when user is logged in", async () => {
    require("../common/api/auth").getUser.mockResolvedValue(mockResponse);
    localStorage.setItem("token", token);
    const res = await auth.getCurrentUser();
    await waitFor(() => {
      expect(API.getUser).toHaveBeenCalledWith(token);
    });
    await waitFor(() => {
      expect(res).toEqual({data: userData});
    });
    localStorage.removeItem("token");
  });

  test("getCurrentUser should return null when user is not logged in", async () => {
    const result = await auth.getCurrentUser();
    await waitFor(() => {
      expect(result).toBeNull();
    });
  });
});
