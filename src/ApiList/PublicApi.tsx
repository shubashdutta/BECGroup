import { baseUrl } from "@/config";
import axios from "axios";

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);

export const PublicGetHeroSection = (params: any) =>
  api.get("auth/hero/all", { params });

export const PublicGetVisa = (params: any) =>
  api.get("auth/testimonial/all", { params });

export const PublicGetVideo = (params: any) =>
  api.get("auth/success/all", { params });

export const PublicGetTeam = (params: any) =>
  api.get("auth/team/all", { params });

export const PublicFooter = (params: any) =>
  api.get("auth/footer/all", { params });

export const PublicAboutAndAds = (params: any) =>
  api.get("auth/public/about-us/all", { params });

export const publicContact = (data: any) =>
  api.post("auth/contact-form/create", data);

export const GetUniversityResult = (params: any) =>
  api.get("auth/university/filter-values", { params });

export const PublicStudentRegister = (data: any) =>
  api.post("auth/application-form/create", data);
export const PublicStudentRegisterUpdate = (data: any) =>
  api.post("auth/application-form/update", data);
export const PublicApplicationGet = (params: any) =>
  api.get("auth/application-form/all", { params });
export const PublicApplicationFormDelete = (id: number) =>
  api.delete(`/auth/application-form/delete/${id}`);

export const VerfiyOtp = (data: any) => api.post("auth/otp/verify", data);

export const PublicStudentForm = (data: any) =>
  api.post("auth/student/add", data);

// export const PublicStudentDetails = (params: any) =>
//   api.get("auth/student/all", { params });

export const PublicSutdentShortData = (params: any) =>
  api.get("auth/student/short/all", { params });

export const PublicReception = (data: any) =>
  api.post("auth/reception/form/create", data);
