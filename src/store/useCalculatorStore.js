import { create } from 'zustand';

const useCalculatorStore = create((set) => ({
  enlistmentDate: '',
  branch: 'army',
  dischargeDate: '',
  setEnlistmentDate: (date) => set({ enlistmentDate: date }),
  setBranch: (branch) => set({ branch }),
  setDischargeDate: (date) => set({ dischargeDate: date })
}));

export default useCalculatorStore;
