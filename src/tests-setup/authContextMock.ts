import * as AuthContext from "../context/AuthContext";

jest.mock("../context/AuthContext", () => ({
  ...jest.requireActual("../context/AuthContext"),
  useAuth: jest.fn(),
}));

export const useAuthMock = AuthContext.useAuth as jest.Mock;
