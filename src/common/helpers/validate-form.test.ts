import {isValidEmail, isValidName, isValidPassword, isValidCode} from "./validate-form";

describe("isValidEmail", () => {
  test("should return true for a valid email", () => {
    const validEmail = "test@example.com";
    expect(isValidEmail(validEmail)).toBe(true);
  });

  test("should return false for an invalid email", () => {
    const invalidEmail = "test@example";
    expect(isValidEmail(invalidEmail)).toBe(false);
  });

  test("should return false for an empty email", () => {
    const emptyEmail = "";
    expect(isValidEmail(emptyEmail)).toBe(false);
  });
});

describe("isValidName", () => {
  test("should return true for a valid name", () => {
    const validName = "John";
    expect(isValidName(validName)).toBe(true);
  });

  test("should return false for a name less than 3 characters", () => {
    const shortName = "ab";
    expect(isValidName(shortName)).toBe(false);
  });

  test("should return false for an empty name", () => {
    const emptyName = "";
    expect(isValidName(emptyName)).toBe(false);
  });
});

describe("isValidPassword", () => {
  test("should return true for a valid password", () => {
    const validPassword = "securepassword";
    expect(isValidPassword(validPassword)).toBe(true);
  });

  test("should return false for an empty password", () => {
    const emptyPassword = "";
    expect(isValidPassword(emptyPassword)).toBe(false);
  });

  test("should return false for a password less than 6 characters", () => {
    const shortPassword = "12345";
    expect(isValidPassword(shortPassword)).toBe(false);
  });

  test("should return false for mismatched passwords", () => {
    const password = "password123";
    const repeatPassword = "differentpassword";
    expect(isValidPassword(password, repeatPassword)).toBe(false);
  });
});

describe("isValidCode", () => {
  test("should return true for a valid 6-digit code", () => {
    const validCode = "123456";
    expect(isValidCode(validCode)).toBe(true);
  });

  test("should return false for an empty code", () => {
    const emptyCode = "";
    expect(isValidCode(emptyCode)).toBe(false);
  });

  test("should return false for an invalid code", () => {
    const invalidCode = "abc123";
    expect(isValidCode(invalidCode)).toBe(false);
  });

  test("should return false for a code with the wrong length", () => {
    const shortCode = "12345";
    const longCode = "1234567";
    expect(isValidCode(shortCode)).toBe(false);
    expect(isValidCode(longCode)).toBe(false);
  });
});
