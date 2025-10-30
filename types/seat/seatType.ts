import { Hall } from "../hall/hall";

export type SeatType = {
    id: string;
    name: string;
    width: number;
    height: number;
    icon: string;
    color: string;
    hall?: Hall;
    capacity?: number;
  };