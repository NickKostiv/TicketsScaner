import { AxiosError } from "axios";

export const getErrorMessage = (error: AxiosError | null): string => {
    const errData = (error as any)?.response?.data;

    console.log("Unknown error data:", errData.errors);

    if (errData?.errors?.hallSession === "ended") {
        return "Сеанс вже завершився";
    }

    if (errData?.errors?.hallSession === "canceled") {
        return "Сеанс вже завершився";
    }

    if (errData?.errors?.ticket === "notFound") {
        return "Квиток не знайдено";
    }

    if (errData?.errors?.sessionSeat === "sessionSeatNotFound") {
        return "Квиток вже був використаний";
    }

    if (errData?.errors?.hallSession === "hallSessionNotFound") {
        return "Квиток вже був використаний";
    }

    return "Сталася помилка при перевірці квитка";
};


//TODO: review this errors
// if (dto.cinemaId && dto.cinemaId !== hallSession.hall.cinemaId) {
//   throw new UnprocessableEntityException({
//     errors: { ticketValidateEntry: 'cinemaNotMatch' },
//   });
// }

// if (dto.hallSessionId && dto.hallSessionId !== hallSession.id) {
//   throw new UnprocessableEntityException({
//     errors: { ticketValidateEntry: 'hallSessionNotMatch' },
//   });
// }