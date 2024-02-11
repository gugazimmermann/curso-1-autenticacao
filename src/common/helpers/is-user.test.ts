import {type IUserData} from "../interfaces/user";
import isUser from "./is-user";

describe("isUser", () => {
  test("should return true for valid user", () => {
    const validUserData: IUserData = {
      id: "1234",
      name: "user test",
      email: "test@test.com",
      verified: true,
    };
    expect(isUser(validUserData)).toBe(true);
  });

  test("should return false for a string", () => {
    const stringInput = "invalid";
    expect(isUser(stringInput)).toBe(false);
  });

  test("should return false for an array", () => {
    const arrayInput: IUserData[] = [
      {
        id: "1234",
        name: "user test",
        email: "test@test.com",
        verified: true,
      },
    ];
    expect(isUser(arrayInput)).toBe(false);
  });

  test("should return false for undefined", () => {
    const undefinedInput = undefined;
    expect(isUser(undefinedInput)).toBe(false);
  });
});
