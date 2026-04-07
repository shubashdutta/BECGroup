import { apiRequest } from "../lib/axiosSetup";

export const EmployeeLogin = (data: any) =>
  apiRequest.post("auth/user/authenticate", data);
