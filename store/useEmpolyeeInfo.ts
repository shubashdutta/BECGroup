import { create } from "zustand";

type EmployeeStore = {
  employee: any;
  setEmployee: (data: any) => void;
  clearEmployee: () => void;
};

export const useEmployee = create<EmployeeStore>((set) => ({
  employee: null,
  setEmployee: (data) => set({ employee: data }),
  clearEmployee: () => set({ employee: null }),
}));
