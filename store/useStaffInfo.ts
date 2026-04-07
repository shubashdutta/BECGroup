import { create } from "zustand";
type StaffStore = {
  staff: any;
  setStaffData: (data: any) => void;
  clearStaffData: () => void;
};

export const useStaffInfo = create<StaffStore>((set) => ({
  staff: null,
  setStaffData: (data) => set({ staff: data }),
  clearStaffData: () => set({ staff: null }),
}));
