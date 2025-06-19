import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF6FF",
  },
  bgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  dialogContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  dialogTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  dialogText: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 22,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  allowButton: {
    backgroundColor: "#7EADE5",
  },
  continueButton: {
    backgroundColor: "#E5A47E",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  cameraContainer: {
    flex: 5,
  },
  camera: {
    flex: 1,
  },

  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  noCameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noCameraText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },

  scannerFrame: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: "#7EADE5",
    borderRadius: 20,
    backgroundColor: "transparent",
    overflow: "hidden",
    position: "relative",
  },
  scanLine: {
    height: 3,
    width: "100%",
    backgroundColor: "#7EADE5",
    position: "absolute",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 15,
    overflow: "hidden",
  },
  modalHeader: {
    padding: 15,
    alignItems: "center",
  },
  validHeader: {
    backgroundColor: "#4CAF50",
  },
  invalidHeader: {
    backgroundColor: "#F44336",
  },
  modalHeaderText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalBody: {
    padding: 20,
    alignItems: "center",
  },
  modalButton: {
    backgroundColor: "#7EADE5",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
