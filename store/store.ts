import { create } from "zustand";
import { createHallSlice } from "./slices/createHallSlice";
import { createSessionSlice } from "./slices/createSessionSlice";
import { createUserSlice } from "./slices/createUserSlice";

export const useStore = create((set) => ({
    ...createHallSlice(set),
    ...createSessionSlice(set),
    ...createUserSlice(set),
  }));