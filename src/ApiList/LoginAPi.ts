/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiRequest } from "../lib/axiosSetup";

export const AdminLogin = (data: any) =>
  apiRequest.post("auth/user/authenticate", data);
