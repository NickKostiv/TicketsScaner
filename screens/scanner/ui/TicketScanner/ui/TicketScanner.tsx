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
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRBg from "../../../../../assets/images/QR-Bg.svg";

import { styles } from "./styles";
import { useValidateEntry } from "@/screens/ optionsSelection/hooks/useValidateEntry";
import { Ticket } from "@/types/ticket/ticket";
import { getTicketStatusText } from "../utils/getTicketStatusText";
import { TicketStateEnum } from "@/constants/ticketStateEnum";

export const TicketScanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [showPermissionDialog, setShowPermissionDialog] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [showResultModal, setShowResultModal] = useState(true);
  // const [ticketValid, setTicketValid] = useState(true);
  const scanLineAnimation = useRef(new Animated.Value(0)).current;

  const { mutate, data, isPending, isSuccess, isError } = useValidateEntry();


  // const scannedTicket = useGetTickets(barcode, scanned)
  // console.log("findedTicket", scannedTicket)
  // const ticket = scannedTicket.data?.[0];


  const toggleShowResultModal = () => {
    setShowResultModal((prev) => !prev);
  };

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
    if(ticket.state === TicketStateEnum.SOLD && ticket.scanTimes ===1 ) {
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={showResultModal}
        onRequestClose={handleCloseModal}
      >
        { !data ? <View >Loading</View> :

        
        <View style={styles.modalBackground}>


          <View style={styles.modalContainer}>
            <View
              style={[
                styles.modalHeader,
                isTicketValid(data.ticket) ? styles.validHeader : styles.invalidHeader,
              ]}
            >
              <Text style={styles.modalHeaderText}>
                {isTicketValid(data.ticket) ? "Квиток Дійсний" : "Квиток не дійсний"}
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


              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.modalButtonText}>
                    {isTicketValid(data.ticket) ? "OK" : "Спробувати ще"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* </> */}
          {/* } */}
        </View>
        }
      </Modal>
    </>
  );
};
