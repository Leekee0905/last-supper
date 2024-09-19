import create from 'zustand';

export const useCalculatorStore = create((set) => ({
  branch: 'army',
  enlistmentDate: '',
  dischargeDate: '',
  setBranch: (branch) => set({ branch }),
  setEnlistmentDate: (date) => set({ enlistmentDate: date }),
  setDischargeDate: (date) => set({ dischargeDate: date }),
}));
