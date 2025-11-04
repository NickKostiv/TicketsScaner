import { TicketStateEnum } from "@/constants/ticketStateEnum";
import { TicketDetails } from "@/screens/ optionsSelection/hooks/useTicketValidation";
import { AxiosError } from "axios";

export const getErrorMessage = (error: AxiosError | null, ticket: TicketDetails | null): string => {
    const errData = (error as any)?.response?.data;

    switch (true) {
        // --- Помилки з бекенду ---
        case errData?.errors?.hallSession === "ended":
            return "Сеанс вже завершився";

        case errData?.errors?.hallSession === "canceled":
            return "Сеанс скасовано";

        case errData?.errors?.hallSession === "hallSessionNotFound":
            return "Сеанс не знайдено";

        case errData?.errors?.ticket === "notFound":
            return "Квиток не знайдено";

        case errData?.errors?.sessionSeat === "sessionSeatNotFound":
            return "Місце не знайдено";

        // --- Перевірка повторного сканування ---
        case !!ticket?.scanTimes && ticket.scanTimes > 1:
            return "Квиток вже був використаний";

        // --- Перевірка статусу квитка ---
        case ticket?.ticketState === TicketStateEnum.REFUNDED:
            return "Квиток повернений. Вхід заборонений.";

        case ticket?.ticketState === TicketStateEnum.EXCHANGED:
            return "Квиток обміняний. Використайте новий квиток.";

        case ticket?.ticketState === TicketStateEnum.RETURNED:
            return "Квиток скасований. Вхід заборонений.";

        // SOLD не повертаємо як помилку — це валідний стан,
        // якщо дійшли сюди — значить помилка не визначена
        default:
            return "Сталася помилка при перевірці квитка";
    }
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