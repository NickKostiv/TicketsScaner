import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: Colors.light.white,
        borderRadius: 15,
        overflow: "hidden",
    },
    modalHeader: {
        padding: 15,
        alignItems: "center",
    },
    validHeader: {
        backgroundColor: Colors.light.success,
    },
    invalidHeader: {
        backgroundColor: Colors.light.alert,
    },
    modalHeaderText: {
        color: Colors.light.white,
        fontSize: 20,
        fontWeight: "bold",
    },
    modalBody: {
        padding: 20,
        alignItems: "center",
    },
    modalBodyInfo: {
        marginBottom: 20,
        gap: 10,
    },
    modalBodyInfoText: {
        fontSize: 18,
    },
    modalBodyInfoTextHighlighted: {
        fontSize: 18,
        fontWeight: "bold",
    },
    modalButtonContainer: {
        marginTop: 20,
    },
    modalButton: {
        backgroundColor: Colors.light.primary,
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 50,
    },
    modalButtonText: {
        color: Colors.light.white,
        fontWeight: "bold",
        fontSize: 18,
    },
    errorText: {
        color: Colors.light.text,
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 30
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    loadingBox: {
        backgroundColor: Colors.light.white,
        paddingVertical: 40,
        paddingHorizontal: 30,
        borderRadius: 15,
        alignItems: "center",
        width: "75%",
        shadowColor: Colors.light.text,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },

    loadingText: {
        fontSize: 20,
        fontWeight: "700",
        color: Colors.light.primary,
        marginBottom: 20,
    },

    loadingSubText: {
        fontSize: 16,
        color: Colors.light.text,
    },
})