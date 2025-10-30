    export type PriceSchema = {
    id: string;
    name: string;
    startTime: string;
    startDate: string | null;
    endTime: string;
    endDate: string | null;
    days: WeekDay[];
    infinite: boolean;
    descriptions: PriceSchemaDescription[];
  };

  export type PriceSchemaDescription = {
    id: string;
    seatType: SeatType;
    ticketType: TicketType;
    price: number;
  };