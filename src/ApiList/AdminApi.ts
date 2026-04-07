import { apiRequest } from "../lib/axiosSetup";

export const GetCureentAdmin = () => apiRequest.get("api/current/admin");

export const GetCurrentUser = () => apiRequest.get("api/current/user");

//  Add Reception

export const AddReception = (data: any) =>
  apiRequest.post("api/reception/form/create", data);

export const UpdateReception = (data: any) =>
  apiRequest.post("api/reception/form/update", data);
export const DeleteReception = (id: any) =>
  apiRequest.delete(`api/reception/form/delete/${id}`);

// Add council
export const AddCouncil = (data: any) =>
  apiRequest.post("api/council/form/create", data);
export const DeleteCouncil = (id: number) =>
  apiRequest.delete(`api/council/form/delete/${id}`);

export const updateCouncil = (data: any) =>
  apiRequest.post("api/council/form/update", data);

export const GetCouncil = (params: any) =>
  apiRequest.get("api/council/form/all", { params });

// Add Reception

export const GetReception = (params: any) =>
  apiRequest.get("api/reception/form/all", { params });

export const VerfiyReception = (data: any) =>
  apiRequest.post("api/reception/form/verify", data);

//  Add Permission
export const AddPermision = (data: any) =>
  apiRequest.post("api/permission/create", data);
export const UpdatePermission = (data: any) =>
  apiRequest.post("api/permission/update", data);

export const DeletePermission = (id: number) =>
  apiRequest.delete(`api/permission/delete/${id}`);

export const GetPermission = (params?: any) =>
  apiRequest.get("api/permission/all", { params });

//  Role
export const AddRole = (data: any) => apiRequest.post("api/role/create", data);

export const UpdateRole = (data: any) =>
  apiRequest.post("api/role/update", data);
export const GetRole = (params: any) =>
  apiRequest.get("api/role/all", { params });

export const DeleteRole = (id: number) =>
  apiRequest.delete(`api/role/delete/${id}`);

//  Add Employee

export const AddEmployee = (data: any) =>
  apiRequest.post("api/user/create", data);

export const UpdateEmployee = (data: any) =>
  apiRequest.post("api/user/update", data);
export const GetEmployee = (params: any) =>
  apiRequest.get("api/user/all", { params });

export const DeleteEmployee = (id: number) =>
  apiRequest.delete(`api/user/delete/${id}`);

// Add Student
export const AddStudent = (data: any) =>
  apiRequest.post("api/customer/create", data);
export const UpdateStudent = (data: any) =>
  apiRequest.post("api/customer/update", data);
export const DeleteStudent = (id: number) =>
  apiRequest.delete(`api/customer/delete/${id}`);

export const GetStudentList = (params: any) =>
  apiRequest.get("api/customer/all", { params });

// Add Visa Granted

export const AddVisaGranted = (data: any) =>
  apiRequest.post("api/testimonial/create", data);
export const GetVisaGranted = (params: any) =>
  apiRequest.get("api/testimonial/all", { params });

export const UpdateVisaGranted = (data: any) =>
  apiRequest.post("api/testimonial/update", data);

export const DeleteVisaGranted = (id: number) =>
  apiRequest.delete(`api/testimonial/delete/${id}`);
// Add Herosection
export const AddHeroSection = (data: any) =>
  apiRequest.post("api/hero/create", data);

export const DeleteHeroSection = (id: number) =>
  apiRequest.delete(`api/hero/delete/${id}`);

export const GetHeroSection = (params: any) =>
  apiRequest.get("api/hero/all", { params });

// Add Teams
export const AddTeam = (data: any) => apiRequest.post("api/team/create", data);
export const GetTeam = (params: any) =>
  apiRequest.get("api/team/all", { params });

export const UpdateTeams = (data: any) =>
  apiRequest.post("api/team/update", data);

export const DeleteTeams = (id: number) =>
  apiRequest.delete(`api/team/delete/${id}`);

// Add Video
export const AddVideo = (data: any) =>
  apiRequest.post("api/success/create", data);

export const GetVideo = (params: any) =>
  apiRequest.get("api/success/all", { params });
export const DeleteVideo = (id: number) =>
  apiRequest.delete(`api/success/delete/${id}`);

export const GetUnivetrsityList = (params: any) =>
  apiRequest.get("api/csv/courses/search", { params });
export const uinversity = (data: any) =>
  apiRequest.post("api/csv/upload", data);

export const GetUniversityCount = (params: any) =>
  apiRequest.get("api/analytic/country-wise/count");

export const GetUniversityFilter = (params: any) =>
  apiRequest.get("api/csv/filters", { params });

export const AddAboustAndAds = (data: any) =>
  apiRequest.post("api/about-us/create", data);

export const UpdateAboutUSAndAds = (data: any) =>
  apiRequest.post("api/about-us/update", data);

export const GetAboutAds = (params: any) =>
  apiRequest.get("api/about-us/all", { params });

export const DeleteAds = (id: number) =>
  apiRequest.delete(`api/about-us/delete/${id}`);

export const AddFooter = (data: any) =>
  apiRequest.post("api/footer-header/create", data);

export const UpdateFooter = (data: any) =>
  apiRequest.post("api/footer-header/update", data);

export const GetFooter = (params: any) =>
  apiRequest.get("/api/footer-header/all", { params });

export const DeleteFooter = (id: number) =>
  apiRequest.delete(`api/footer-header/delete/${id}`);

// uplaod Csv
export const UploadCsv = (data: any) =>
  apiRequest.post("auth/csv/upload", data);

export const DeleteUniversity = (id: number) =>
  apiRequest.delete(`api/csv/delete/${id}`);

// Hostel api
export const AdminAddHostelStudent = (data: any) =>
  apiRequest.post("api/hostel/student/create", data);

export const AdminUpdateHostelStudent = (data: any) =>
  apiRequest.post("api/hostel/student/update", data);

export const AdminGetHostelStudent = (params: any) =>
  apiRequest.get("api/hostel/student/all", { params });

export const AdminDeleteHostelStudent = (id: any) =>
  apiRequest.delete(`api/hostel/student/delete/${id}`);

export const AdminAddHostelStaff = (data: any) =>
  apiRequest.post("api/hostel/staff/create", data);

export const AdmiUpdateStaff = (data: any) =>
  apiRequest.post("api/hostel/staff/update", data);
export const AdminGetHostelStaff = (params: any) =>
  apiRequest.get("api/hostel/staff/all", { params });

export const AdminDeleteHostelStaff = (id: number) =>
  apiRequest.delete(`api/hostel/staff/delete/${id}`);

// Get Contact INfo Api
export const GetPublicContactList = (params: any) =>
  apiRequest.get("api/all", { params });

export const DeletePublicContactList = (id: number) =>
  apiRequest.delete(`api/delete/${id}`);

// Notification

export const Nofification = (data: any) =>
  apiRequest.post("api/notice/create", data);

export const UpdateNotification = (data: any) =>
  apiRequest.post("api/notice/update", data);

export const DeleteNotification = (id: number) =>
  apiRequest.delete(`api/notice/delete/${id}`);

// Hostel Student Payment List

export const GetHostelStudentPaymentList = (params: any) =>
  apiRequest.get("api/payment/all", { params });

// admission StudentGet

export const AdminStudentDetails = (params: any) =>
  apiRequest.get("api/student/all", { params });

// salary

export const AdminGetSalaryStatement = (params: any) =>
  apiRequest.get("api/payment/history/all", { params });

//  clssses student
export const AdminAddClassesStudent = (data: any) =>
  apiRequest.post("api/enrolled-student/create", data);

export const AdminUpdateClassesStudent = (data: any) =>
  apiRequest.post("api/enrolled-student/update", data);

export const AdminDeleteClassesStudent = (id: number) =>
  apiRequest.delete(`api/enrolled-student/delete/${id}`);
