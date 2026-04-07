import { create } from "zustand";

type ConsultingStudentStore = {
  consultingStudent: any;
  setConsultingData: (data: any) => void;
  clearConsultingData: () => void;
};

export const useConsultingStudent = create<ConsultingStudentStore>((set) => ({
  consultingStudent: null,
  setConsultingData: (data) => set({ consultingStudent: data }),
  clearConsultingData: () => set({ consultingStudent: null }),
}));
