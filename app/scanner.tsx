import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import QRBg from "../assets/images/QR-Bg.svg";
import {
  Camera,
  useCameraPermissions,
  CameraView,
  BarcodeScanningResult,
} from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [showPermissionDialog, setShowPermissionDialog] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [ticketValid, setTicketValid] = useState(true); // Always valid for now
  const router = useRouter();

  // Check permission status when it changes
  useEffect(() => {
    if (permission?.granted) {
      setShowPermissionDialog(false);
    }
  }, [permission]);

  const handleRequestPermission = async () => {
    try {
      await requestPermission();

      if (!permission?.granted) {
        Alert.alert(
          "Немає доступу до камери",
          "Для сканування QR-кодів необхідно надати доступ до камери."
        );
      }
    } catch (err) {
      console.error("Error requesting camera permission:", err);
      Alert.alert("Помилка", "Не вдалося отримати доступ до камери.");
    }
    setShowPermissionDialog(false);
  };

  const continueWithoutCamera = () => {
    setShowPermissionDialog(false);
  };

  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    if (scanned) return;

    setScanned(true);
    // Hardcoded to always show valid ticket
    setTicketValid(true);
    setShowResultModal(true);

    console.log(`Код типу ${result.type} відскановано: ${result.data}`);
  };

  const handleCloseModal = () => {
    setShowResultModal(false);
    setScanned(false);
  };

  const handleManualEntry = () => {
    // Handle manual entry functionality
    Alert.alert("Ручне введення", "Функція ще не реалізована");
  };

  // For testing only - trigger the valid ticket modal
  const testShowValidTicket = () => {
    setScanned(true);
    setTicketValid(true);
    setShowResultModal(true);
  };

  if (showPermissionDialog) {
    return (
      <View style={styles.container}>
        <View style={styles.bgContainer}>
          <QRBg width="100%" height="100%" />
        </View>
        <View style={styles.dialogContainer}>
          <Text style={styles.dialogTitle}>Попередження</Text>
          <Text style={styles.dialogText}>
            Якщо не надати додатку доступ до камери,{"\n"}
            то сканування буде не можливим.{"\n"}
            Продовжити без камери ?
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.allowButton]}
            onPress={handleRequestPermission}>
            <Text style={styles.buttonText}>ДОЗВОЛИТИ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.continueButton]}
            onPress={continueWithoutCamera}>
            <Text style={styles.buttonText}>ПРОДОВЖИТИ</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // After permission dialog is handled
  return (
    <View style={styles.container}>
      {permission?.granted ? (
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          />

          {/* QR Frame Overlay */}
          <View style={styles.overlayContainer}>
            <View style={styles.scannerFrame} />

            {/* Manual Entry Button */}
            <TouchableOpacity
              style={styles.manualEntryButton}
              onPress={handleManualEntry}>
              <Text style={styles.manualEntryText}>Ввести вручну</Text>
            </TouchableOpacity>

            {/* For testing - place below the manual entry button */}
            <TouchableOpacity
              style={[styles.manualEntryButton, { marginTop: 10 }]}
              onPress={testShowValidTicket}>
              <Text style={styles.manualEntryText}>Тест: Дійсний квиток</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Navigation */}
          <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navButton}>
              <Ionicons name="person-outline" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.scannerIconContainer}>
              <View style={styles.scannerIcon}>
                <Image
                  source={require("../assets/images/ScanAuthImg.png")}
                  style={styles.scannerIconImage}
                />
              </View>
              <Text style={styles.scannerText}>Сканування...</Text>
            </View>

            <TouchableOpacity style={styles.navButton}>
              <Ionicons name="menu-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.noCameraContainer}>
          <Text style={styles.noCameraText}>Немає доступу до камери</Text>
          <TouchableOpacity
            style={[styles.button, styles.allowButton]}
            onPress={handleRequestPermission}>
            <Text style={styles.buttonText}>ДОЗВОЛИТИ КАМЕРУ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.allowButton, { marginTop: 20 }]}
            onPress={testShowValidTicket}>
            <Text style={styles.buttonText}>ТЕСТ: КВИТОК ДІЙСНИЙ</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Result Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showResultModal}
        onRequestClose={handleCloseModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.modalHeader,
                ticketValid ? styles.validHeader : styles.invalidHeader,
              ]}>
              <Text style={styles.modalHeaderText}>
                {ticketValid ? "Квиток Дійсний" : "Квиток не дійсний"}
              </Text>
            </View>

            <View style={styles.modalBody}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleCloseModal}>
                <Text style={styles.modalButtonText}>
                  {ticketValid ? "OK" : "Спробувати ще"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
    flex: 1,
    position: "relative",
  },
  camera: {
    flex: 1,
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
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  scannerFrame: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: "#7EADE5",
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  manualEntryButton: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#7EADE5",
    borderRadius: 15,
  },
  manualEntryText: {
    color: "white",
    fontWeight: "500",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  navButton: {
    padding: 10,
  },
  scannerIconContainer: {
    alignItems: "center",
  },
  scannerIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 5,
  },
  scannerIconImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  scannerText: {
    fontSize: 12,
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
