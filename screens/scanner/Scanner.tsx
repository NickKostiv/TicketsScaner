import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRBg from "../../assets/images/QR-Bg.svg";

import { styles } from "./styles";

export default function Scanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [showPermissionDialog, setShowPermissionDialog] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [ticketValid, setTicketValid] = useState(true);
  const router = useRouter();

  const scanLineAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startScanLineAnimation();

    if (permission?.granted) {
      setShowPermissionDialog(false);
    }
  }, [permission]);

  const startScanLineAnimation = () => {
    scanLineAnimation.setValue(0);

    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnimation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnimation, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

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
    setTicketValid(true);
    setShowResultModal(true);

    console.log(`Код типу ${result.type} відскановано: ${result.data}`);
  };

  const handleCloseModal = () => {
    setShowResultModal(false);
    setScanned(false);
  };

  const handleManualEntry = () => {
    Alert.alert("Ручне введення", "Функція ще не реалізована");
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
            onPress={handleRequestPermission}
          >
            <Text style={styles.buttonText}>ДОЗВОЛИТИ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.continueButton]}
            onPress={continueWithoutCamera}
          >
            <Text style={styles.buttonText}>ПРОДОВЖИТИ</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {permission?.granted ? (
          <View style={{ flex: 1 }}>
            <View style={styles.cameraContainer}>
              <CameraView
                style={styles.camera}
                facing="back"
                barcodeScannerSettings={{
                  barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
              />

              <View style={styles.overlayContainer}>
                <View style={styles.scannerFrame}>
                  <Animated.View
                    style={[
                      styles.scanLine,
                      {
                        transform: [
                          {
                            translateY: scanLineAnimation.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 240],
                            }),
                          },
                        ],
                      },
                    ]}
                  />
                </View>

                <TouchableOpacity
                  style={styles.manualEntryButton}
                  onPress={handleManualEntry}
                >
                  <Text style={styles.manualEntryText}>Ввести вручну</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.info}>
              <Text style={styles.infoText}>Куплено квитків: 100</Text>
              <Text style={styles.infoText}>Відскановано квитків: 100</Text>
            </View>

            {/* <View style={styles.bottomNav}>
              <TouchableOpacity style={styles.navButton}>
                <Ionicons name="person-outline" size={24} color="#001F3F" />
              </TouchableOpacity>

              <View style={styles.scannerIconContainer}>
                <View style={styles.scannerIcon}>
                  <QRBg width={50} height={50} />
                </View>
                <Text style={styles.scannerText}>Сканування...</Text>
              </View>

              <TouchableOpacity style={styles.navButton}>
                <Ionicons name="menu-outline" size={24} color="#001F3F" />
              </TouchableOpacity>
            </View> */}
          </View>
        ) : (
          <View style={styles.noCameraContainer}>
            <Text style={styles.noCameraText}>Немає доступу до камери</Text>
            <TouchableOpacity
              style={[styles.button, styles.allowButton]}
              onPress={handleRequestPermission}
            >
              <Text style={styles.buttonText}>ДОЗВОЛИТИ КАМЕРУ</Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal
          animationType="fade"
          transparent={true}
          visible={showResultModal}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <View
                style={[
                  styles.modalHeader,
                  ticketValid ? styles.validHeader : styles.invalidHeader,
                ]}
              >
                <Text style={styles.modalHeaderText}>
                  {ticketValid ? "Квиток Дійсний" : "Квиток не дійсний"}
                </Text>
              </View>

              <View style={styles.modalBody}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.modalButtonText}>
                    {ticketValid ? "OK" : "Спробувати ще"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
