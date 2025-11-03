import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import QRBg from "../../../../../assets/images/QR-Bg.svg";

import { TicketStateEnum } from "@/constants/ticketStateEnum";
import { useValidateEntry } from "@/screens/ optionsSelection/hooks/useValidateEntry";
import { Ticket } from "@/types/ticket/ticket";
import { ScanResultModal } from "../../ScanResultModal/ui/ScanResultModal";
import { styles } from "./styles";

export const TicketScanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [showPermissionDialog, setShowPermissionDialog] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  // const [ticketValid, setTicketValid] = useState(true);
  const scanLineAnimation = useRef(new Animated.Value(0)).current;

  const { mutate, data, isPending, isSuccess, isError, error } = useValidateEntry();


  // const scannedTicket = useGetTickets(barcode, scanned)
  // console.log("findedTicket", scannedTicket)
  // const ticket = scannedTicket.data?.[0];


  // const toggleShowResultModal = () => {
  //   setShowResultModal((prev) => !prev);
  // };

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

    const barcode = Number(result.data);
    setScanned(true);
    setShowResultModal(true)

    mutate(barcode);

  };

  const isTicketValid = (ticket: Ticket): boolean => {
    if (ticket?.state === TicketStateEnum.SOLD && ticket.scanTimes === 1) {
      return true;
    }
    return false;
  }

  const handleCloseModal = () => {
    setShowResultModal(false);
    setScanned(false);
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
            <Text style={styles.buttonText}>СКАСУВАТИ</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <>
      {permission?.granted ? (
        <View style={{ flex: 10 }}>
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
            </View>
          </View>
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

      <ScanResultModal data={data} showResultModal={showResultModal} handleCloseModal={handleCloseModal} isTicketValid={isTicketValid} isSuccess={isSuccess} isPending={isPending} isError={isError} error={error} />
    </>
  );
};
