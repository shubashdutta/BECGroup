import { create } from "zustand";

type StudentStore = {
  student: any;
  setStudentData: (data: any) => void;
  clearStudentData: () => void;
};

export const useClassesStudent = create<StudentStore>((set) => ({
  student: null,
  setStudentData: (data) => set({ student: data }),
  clearStudentData: () => set({ student: null }),
}));
