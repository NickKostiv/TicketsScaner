import { AxiosError } from "axios";
import { FC } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { styles } from "./styles";

type TicketScannerProps = {
    data: any;
    showResultModal: boolean;
    handleCloseModal: () => void;
    isTicketValid: (ticket: any) => boolean;
    isSuccess: boolean;
    isPending: boolean;
    isError: boolean;
    error: AxiosError | null;
}

export const ScanResultModal: FC<TicketScannerProps> = ({ data, showResultModal, handleCloseModal, isTicketValid, isSuccess, isPending, isError, error }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showResultModal}
            onRequestClose={handleCloseModal}
        >



            <View style={styles.modalBackground}>
                {isPending ? <View style={styles.loadingContainer}>
                    <View style={styles.loadingBox}>
                        <Text style={styles.loadingText}>Завантаження...</Text>
                        <Text style={styles.loadingSubText}>Будь ласка, зачекайте</Text>
                    </View>
                </View> :


                    <View style={styles.modalContainer}>
                        <View
                            style={[
                                styles.modalHeader,
                                isTicketValid(data?.ticket) ? styles.validHeader : styles.invalidHeader,
                            ]}
                        >
                            <Text style={styles.modalHeaderText}>
                                {isTicketValid(data?.ticket) ? "Квиток Дійсний" : "Квиток не дійсний"}
                            </Text>
                        </View>

                        <View style={styles.modalBody}>
                            {isSuccess && data && (
                                <View style={styles.modalBodyInfo}>
                                    <Text style={styles.modalBodyInfoText}>
                                        Кінотеатр:{" "}
                                        <Text style={styles.modalBodyInfoTextHighlighted}>
                                            {data.hallSessionDetails.hall.cinemaId ?? "-"}
                                        </Text>
                                    </Text>

                                    <Text style={styles.modalBodyInfoText}>
                                        Фільм:{" "}
                                        <Text style={styles.modalBodyInfoTextHighlighted}>
                                            {data.hallSessionDetails.movie.title ?? "-"}
                                        </Text>
                                    </Text>

                                    <Text style={styles.modalBodyInfoText}>
                                        Дата та час сеансу:{" "}
                                        <Text style={styles.modalBodyInfoTextHighlighted}>
                                            {new Date(data.hallSessionDetails.start).toLocaleString("uk-UA", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </Text>
                                    </Text>

                                    <Text style={styles.modalBodyInfoText}>
                                        Зал:{" "}
                                        <Text style={styles.modalBodyInfoTextHighlighted}>
                                            {data.hallSessionDetails.hall.name ?? "-"}
                                        </Text>
                                    </Text>

                                    <Text style={styles.modalBodyInfoText}>
                                        Ряд:{" "}
                                        <Text style={styles.modalBodyInfoTextHighlighted}>
                                            {data.seatDetails.row ?? "-"}
                                        </Text>
                                    </Text>

                                    <Text style={styles.modalBodyInfoText}>
                                        Місце:{" "}
                                        <Text style={styles.modalBodyInfoTextHighlighted}>
                                            {data.seatDetails.number ?? "-"}
                                        </Text>
                                    </Text>

                                    <Text style={styles.modalBodyInfoText}>
                                        Тип квитка:{" "}
                                        <Text style={styles.modalBodyInfoTextHighlighted}>
                                            {data.seatDetails.seatType.name ?? "-"}
                                        </Text>
                                    </Text>



                                    <Text style={styles.modalBodyInfoText}>
                                        Статус:{" "}
                                        <Text style={styles.modalBodyInfoTextHighlighted}>
                                            {/* {getTicketStatusText(data.ticket)} */}'Статус'
                                        </Text>
                                    </Text>
                                </View>
                            )}

                            {
                                isError && (
                                    <Text style={styles.errorText}>{getErrorMessage(error)}</Text>
                                )
                            }


                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={handleCloseModal}
                                >
                                    <Text style={styles.modalButtonText}>
                                        {isTicketValid(data?.ticket) ? "OK" : "Спробувати ще"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
            </View>
        </Modal>
    )
}