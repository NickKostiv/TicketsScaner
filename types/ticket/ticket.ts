

export type Ticket = {
  id: string;
  barCode: number | null;
  price: number;
  scanTimes: number;
  sessionSeat: SessionSeat;
  ticketType: TicketType;
  user: UserType | null;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  state: TicketStateEnum;
  scannedAt: Date | null;
};

