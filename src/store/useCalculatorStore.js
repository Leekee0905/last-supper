import {create} from 'zustand';

const useCalculatorStore = create((set) => ({
  enlistmentDate: '',
  setEnlistmentDate: (date) => set({ enlistmentDate: date }),
  branch: 'army',
  setBranch: (branch) => set({ branch }),
  dischargeDate: '',
  setDischargeDate: (date) => set({ dischargeDate: date }),
}));

export default useCalculatorStore;