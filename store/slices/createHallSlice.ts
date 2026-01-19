import { Hall } from "@/types/hall/hall";


export const createHallSlice = (set: (state: any) => void) => ({
    hall: null,
    setHall: (hall: Hall) => set({ hall }),

    resetHall: () =>
    set({
      hall: null,
    })
});