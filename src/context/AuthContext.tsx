import {createContext, useContext, type ReactNode, useReducer, type Dispatch, useEffect} from "react";
import {type IUser} from "../common/interfaces/user";

interface User {
  id: IUser["id"];
  name: IUser["name"];
  email: IUser["email"];
}

interface AuthState {
  user: User | null;
  token: string | null;
}

type AuthAction =
  | {type: "LOGIN"; payload: {user: User; token: string}}
  | {type: "UPDATE_USER"; payload: {user: User}}
  | {type: "LOGOUT"};

type AuthDispatch = Dispatch<AuthAction>;

const AuthContext = createContext<{state: AuthState; dispatch: AuthDispatch} | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  if (action.type === "LOGIN") {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
    };
  } else if (action.type === "UPDATE_USER") {
    return {
      ...state,
      user: action.payload.user,
    };
  } else {
    return {
      ...state,
      user: null,
      token: null,
    };
  }
};

const AuthProvider = ({children}: {children: ReactNode}): JSX.Element => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [state, dispatch] = useReducer(authReducer, {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken ? JSON.parse(storedToken) : null,
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", JSON.stringify(state.token));
  }, [state.user, state.token]);

  return <AuthContext.Provider value={{state, dispatch}}>{children}</AuthContext.Provider>;
};

const useAuth = (): {
  state: AuthState;
  dispatch: AuthDispatch;
} => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export {AuthProvider, useAuth};
