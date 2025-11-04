import { Hall } from "../hall/hall";
import { MovieTypeResponse } from "../movie/movie";
import { SeatType } from "../seat/seatType";
import { Ticket } from "./ticket";

export type ValidateEntryResponse = {
  ticket: Ticket;
  seatDetails: SeatDetails;
  hallSessionDetails: HallSessionDetails
};

export type HallSessionDetails = {
  start: string | Date;
  end: string | Date;
  hall: Hall;
  movie: MovieTypeResponse;
};

export type SeatDetails = {
  row: number;
  number: number;
  seatType: SeatType;
};
