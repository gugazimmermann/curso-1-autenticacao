import {type IUserData} from "../common/interfaces/user";

export interface ITestUser extends IUserData {
  password: string;
}

export interface ComponentSetupProps {
  component: React.ReactElement;
  initialEntries?: string[];
}

export interface SetupComponentProps {
  formVerification?: boolean;
  formError?: string;
  submitError?: boolean;
}
