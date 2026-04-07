// store/programStore.ts
import { create } from "zustand";

export const useProgramStore = create((set: any) => ({
  selectedProgram: null,
  setSelectedProgram: (program: any) => set({ selectedProgram: program }),
}));
