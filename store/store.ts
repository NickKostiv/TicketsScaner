import { Personnel } from "@/types/auth/auth";
import { Cinema } from "@/types/cinema/cinema";
import { Hall } from "@/types/hall/hall";
import { HallSession } from "@/types/session/session";
import { create } from "zustand";
import { createCinemaSlice } from "./slices/createCinameSlice";
import { createHallSlice } from "./slices/createHallSlice";
import { createSessionSlice } from "./slices/createSessionSlice";
import { createUserSlice } from "./slices/createUserSlice";

export interface RootStore {
  // cinema
  cinema: Cinema | null;
  cinemaId: string | null;
  setCinema: (cinema: Cinema) => void;
  setCinemaId: (cinemaId: string) => void;

  // hall
  hall: Hall | null;
  setHall: (hall: Hall) => void;

  // session
  session: HallSession | null;
  setSession: (session: HallSession) => void;

  // user
  personnel: Personnel | null;
  setPersonnel: (personnel: Personnel) => void;

  // global
  resetAll: () => void;
}

export const useStore = create<RootStore>((set) => ({
  ...createHallSlice(set),
  ...createSessionSlice(set),
  ...createUserSlice(set),
  ...createCinemaSlice(set),

  resetAll: () => {
    set({
      hall: null,
      session: null,
      personnel: null,
      cinema: null,
      cinemaId: null,
    });
  },
}));