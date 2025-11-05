import { Cinema } from "@/types/cinema/cinema";


export const createCinemaSlice = (set: (state: any) => void) => ({
    cinema: null,
    cinenaId: null,
    setCinemaId: (cinemaId: string) => set({ cinenaId: cinemaId }),
    setCinema: (cinema: Cinema) => set({ cinema }),

});