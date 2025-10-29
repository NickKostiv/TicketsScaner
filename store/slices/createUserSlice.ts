import { Personnel } from "@/types/auth";



export const createUserSlice = (set: (state: any) => void) => ({
    personnel: null,
    setPersonnel: (personnel: Personnel) => set({ personnel }),
});