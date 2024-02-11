/* eslint-disable no-var */
import {type ITestUser} from "./test-interfaces";
import {type IUserData} from "../common/interfaces/user";

declare global {
  var USER: ITestUser;
  var LOGGEDUSER: IUserData;
  var LOGGEDTOKEN: string;
}

const USER: ITestUser = {
  id: "37b5d530-46fd-4dd2-9873-d6804854a055",
  name: "John Doe",
  email: "john@test.com",
  token: "c3VhQ2hhdmVNdWl0b011aXRvU2VjcmV0YURlVGVzdGUmMzAwJjM3YjVkNTMwLTQ2ZmQtNGRkMi05ODczLWQ2ODA0ODU0YTA1NQ==",
  password: "123456",
  code: "090909",
  verified: true,
};

global.USER = USER;
global.LOGGEDUSER = {
  id: USER.id,
  name: USER.name,
  email: USER.email,
  verified: true,
  token: String(USER.token),
};
global.LOGGEDTOKEN = String(USER.token);
