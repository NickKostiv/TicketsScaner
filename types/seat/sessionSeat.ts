import { SessionSeatState } from "@/constants/sessionSeatState";
import { Seat } from "./seat";
import { SeatType } from "./seatType";

export type SessionSeat = {
    id: string;
    hallSession: {
      id: string;
    };
    originalSeat: Seat | null; 
    row: number;
    number: number;
    seatType: SeatType;
    x: number;
    y: number;
    state: SessionSeatState;
    bookingPhoneNumber: string | null;
    bookingName: string | null;
    bookingEmail: string | null;
    blockedUntil: Date | null;
  };
  