import { TicketStateEnum } from "@/constants/ticketStateEnum";
import { SessionSeat } from "../seat/sessionSeat";
import { User } from "../user/user";
import { TicketType } from "./ticketType";


export type Ticket = {
  id: string;
  barCode: number | null;
  price: number;
  scanTimes: number;
  sessionSeat: SessionSeat;
  ticketType: TicketType;
  user: User | null;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  state: TicketStateEnum;
  scannedAt: Date | null;
};

