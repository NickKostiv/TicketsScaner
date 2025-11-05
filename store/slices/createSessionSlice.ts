import { HallSession } from "@/types/session/session";

export const createSessionSlice = (set: (state: any) => void) => ({
    session: null,
    setSession: (session: HallSession) => set({ session }),
});