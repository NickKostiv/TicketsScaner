import { Cinema } from "@/types/cinema/cinema";


export const createCinemaSlice = (set: (state: any) => void) => ({
    cinema: null,
    cinemaId: null,
    setCinemaId: (cinemaId: string) => set({ cinemaId }),
    setCinema: (cinema: Cinema) => set({ cinema }),

    resetCinema: () =>
    set({
      cinema: null,
      cinemaId: null,
    }),

});