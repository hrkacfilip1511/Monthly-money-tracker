import { create } from "zustand";
import createExpenseSlice from "../functions/createExpenseSlice";
const useStore = create((set, get) => ({
  ...createExpenseSlice(set, get),
}));

export default useStore;
