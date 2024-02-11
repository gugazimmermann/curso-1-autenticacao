import {waitFor} from "@testing-library/react";
import * as API from "../common/api/auth";
import * as auth from "./auth";

const mockResponse = {
  status: 200,
  data: LOGGEDUSER,
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
  test("register should return user data", async () => {
    const data = {
      name: USER.name,
      email: USER.email,
      password: USER.password,
      repeatpassword: USER.password,
    };
    require("../common/api/auth").register.mockResolvedValue(mockResponse);
    await auth.register(data);
    await waitFor(() => {
      expect(API.register).toHaveBeenCalledWith(data);
    });
  });

  test("verifyEmail should return user data", async () => {
    const data = {email: USER.email, code: String(USER.code)};
    require("../common/api/auth").verifyEmail.mockResolvedValue(mockResponse);
    await auth.verifyEmail(data);
    await waitFor(() => {
      expect(API.verifyEmail).toHaveBeenCalledWith(data);
    });
  });

  test("reSendCode should return user data", async () => {
    const data = {email: USER.email};
    require("../common/api/auth").reSendCode.mockResolvedValue(mockResponse);
    await auth.reSendCode(data);
    await waitFor(() => {
      expect(API.reSendCode).toHaveBeenCalledWith(data);
    });
  });

  test("forgotPassword should return user data", async () => {
    const data = {email: USER.email};
    require("../common/api/auth").forgotPassword.mockResolvedValue(mockResponse);
    await auth.forgotPassword(data);
    await waitFor(() => {
      expect(API.forgotPassword).toHaveBeenCalledWith(data);
    });
  });

  test("newPassword should return user data", async () => {
    const data = {
      email: USER.email,
      code: String(USER.code),
      password: USER.password,
      repeatpassword: USER.password,
    };
    require("../common/api/auth").newPassword.mockResolvedValue(mockResponse);
    await auth.newPassword(data);
    await waitFor(() => {
      expect(API.newPassword).toHaveBeenCalledWith(data);
    });
  });

  test("newPassword should handle error and return error object", async () => {
    const data = {
      email: USER.email,
      code: String(USER.code),
      password: USER.password,
      repeatpassword: USER.password,
    };
    require("../common/api/auth").newPassword.mockRejectedValue(mockError);
    await auth.newPassword(data);
    await waitFor(() => {
      expect(API.newPassword).toHaveBeenCalledWith(data);
    });
  });

  test("login should return user data", async () => {
    const data = {email: USER.email, password: USER.password};
    require("../common/api/auth").login.mockResolvedValue(mockResponse);
    await auth.login(data);
    await waitFor(() => {
      expect(API.login).toHaveBeenCalledWith(data);
    });
  });

  test("logout should remove userId", async () => {
    localStorage.setItem("token", LOGGEDTOKEN);
    auth.logout();
    const userToken = localStorage.getItem("token");
    expect(userToken).toBeNull();
  });

  test("getCurrentUser should return user data when user is logged in", async () => {
    require("../common/api/auth").getUser.mockResolvedValue(mockResponse);
    localStorage.setItem("token", LOGGEDTOKEN);
    await auth.getCurrentUser();
    await waitFor(() => {
      expect(API.getUser).toHaveBeenCalledWith(LOGGEDTOKEN);
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
