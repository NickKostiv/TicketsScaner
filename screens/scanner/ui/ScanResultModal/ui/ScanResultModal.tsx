import { TicketDetails } from "@/screens/ optionsSelection/hooks/useTicketValidation";
import { AxiosError } from "axios";
import { FC } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { styles } from "./styles";

type ScanResultModalProps = {
    visible: boolean;
    onClose: () => void;
    status: "initial" | "loading" | "success" | "error";
    ticketDetails: TicketDetails | null;
    isTicketValid: boolean;
    error: AxiosError | null;
};

export const ScanResultModal: FC<ScanResultModalProps> = ({ visible, onClose, status, ticketDetails, isTicketValid, error }) => {

    const formattedDate =
        ticketDetails?.date
            ? new Date(ticketDetails.date).toLocaleString("uk-UA", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })
            : "-";


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >

            <View style={styles.modalBackground}>
                {/* LOADING */}
                {status === "loading" && (
                    <View style={styles.loadingContainer}>
                        <View style={styles.loadingBox}>
                            <Text style={styles.loadingText}>Завантаження...</Text>
                            <Text style={styles.loadingSubText}>Будь ласка, зачекайте</Text>
                        </View>
                    </View>
                )}


                {/* SUCCESS / VALIDATED */}
                {status === "success" && ticketDetails && (
                    <View style={styles.modalContainer}>
                        <View
                            style={[
                                styles.modalHeader, styles.validHeader
                            ]}
                        >
                            <Text style={styles.modalHeaderText}>
                                Квиток Дійсний
                            </Text>
                        </View>

                        <View style={styles.modalBody}>
                            <View style={styles.modalBodyInfo}>
                                <Text style={styles.modalBodyInfoText}>
                                    Кінотеатр:{" "}
                                    <Text style={styles.modalBodyInfoTextHighlighted}>
                                        {ticketDetails.cinema}
                                    </Text>
                                </Text>

                                <Text style={styles.modalBodyInfoText}>
                                    Фільм:{" "}
                                    <Text style={styles.modalBodyInfoTextHighlighted}>
                                        {ticketDetails.movie}
                                    </Text>
                                </Text>

                                <Text style={styles.modalBodyInfoText}>
                                    Дата та час сеансу:{" "}
                                    <Text style={styles.modalBodyInfoTextHighlighted}>
                                        {formattedDate}
                                    </Text>
                                </Text>

                                <Text style={styles.modalBodyInfoText}>
                                    Зал:{" "}
                                    <Text style={styles.modalBodyInfoTextHighlighted}>
                                        {ticketDetails.hall}
                                    </Text>
                                </Text>

                                <Text style={styles.modalBodyInfoText}>
                                    Ряд:{" "}
                                    <Text style={styles.modalBodyInfoTextHighlighted}>
                                        {ticketDetails.row}
                                    </Text>
                                </Text>

                                <Text style={styles.modalBodyInfoText}>
                                    Місце:{" "}
                                    <Text style={styles.modalBodyInfoTextHighlighted}>
                                        {ticketDetails.seat}
                                    </Text>
                                </Text>

                                <Text style={styles.modalBodyInfoText}>
                                    Тип квитка:{" "}
                                    <Text style={styles.modalBodyInfoTextHighlighted}>
                                        {ticketDetails.type}
                                    </Text>
                                </Text>
                            </View>

                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                                    <Text style={styles.modalButtonText}>
                                        {isTicketValid ? "OK" : "Спробувати ще"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}

                {/* ERROR */}
                {status === "error" && (
                    <View style={styles.modalContainer}>
                        <View style={[styles.modalHeader, styles.invalidHeader]}>
                            <Text style={styles.modalHeaderText}>Квиток не дійсний</Text>
                        </View>

                        <View style={styles.modalBody}>
                            <Text style={styles.errorText}>
                                {getErrorMessage(error, ticketDetails)}
                            </Text>

                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                                    <Text style={styles.modalButtonText}>Спробувати ще</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </Modal>
    )
}