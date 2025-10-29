import { Hall } from "@/types/hall";

export const createHallSlice = (set: (state: any) => void) => ({
    hall: null,
    setHall: (hall: Hall) => set({ hall }),
});