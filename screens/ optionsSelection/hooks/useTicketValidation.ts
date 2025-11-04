import { TicketStateEnum } from "@/constants/ticketStateEnum";
import { useValidateEntry } from "./useValidateEntry";

export type TicketDetails = {
    cinema: string;
    movie: string;
    date: string | Date
    hall: string;
    row: string | number;
    seat: string | number;
    type: string;
    ticketState?: TicketStateEnum;
    scanTimes?: number;
}

export const useTicketValidation = () => {
    const { mutate, data, isPending, isSuccess, isError, error } = useValidateEntry();

    const ticket = data?.ticket;
    const hallSession = data?.hallSessionDetails;
    const seat = data?.seatDetails;

    const validate = (barcode: number) => mutate(barcode);

    const isTicketValid =
        ticket?.state === TicketStateEnum.SOLD && ticket.scanTimes === 1;

    const getStatus = (): "initial" | "loading" | "success" | "error" => {
        if (isPending) return "loading";
        if (isError) return "error";
        if (isSuccess && isTicketValid) return "success";
        if (isSuccess && !isTicketValid) return "error";
        return "initial";
    };

    const status = getStatus();


    const ticketDetails = data ? {
        cinema: hallSession?.hall?.name ?? "-",
        movie: hallSession?.movie?.title ?? "-",
        date: hallSession?.start ?? "-",
        hall: hallSession?.hall?.name ?? "-",
        row: seat?.row ?? "-",
        seat: seat?.number ?? "-",
        type: seat?.seatType?.name ?? "-",
        ticketState: ticket?.state,
        scanTimes: ticket?.scanTimes,
    } : null;

    return {
        validate,
        status,
        ticketDetails,
        isTicketValid,
        error,
    };
}