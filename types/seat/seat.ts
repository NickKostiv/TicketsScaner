import { Hall } from "../hall/hall";
import { SeatType } from "./seatType";

export type Seat = {
    id: string;
    hall: Hall;
    row: number;
    number: number;
    seatType: SeatType;
    x: number;
    y: number;
  };