import { useTicketValidation } from "@/screens/ optionsSelection/hooks/useTicketValidation";
import { FC, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScanResultModal } from "../../ScanResultModal/ui/ScanResultModal";
import { styles } from "./styles";

export const ManualEntry: FC = () => {
  const [code, setCode] = useState<string>("");
  const [showResultModal, setShowResultModal] = useState(false);
  const [scanned, setScanned] = useState(false);
  const { validate, status, ticketDetails, isTicketValid, error } = useTicketValidation();

  const handleCloseModal = () => {
    setShowResultModal(false);
    setScanned(false);
  };


  const handleManualEntry = (code: string) => {
    if (scanned) return;

    const barcode = Number(code);
    setScanned(true);
    setShowResultModal(true)

    validate(barcode);

  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={styles.wrapper}>
        <TextInput
          value={code}
          onChangeText={(text: string) => setCode(text)}
          style={styles.codeInput}
          placeholder="Введіть код"
        />

        <TouchableOpacity
          style={[
            styles.manualEntryButton,
            !code.trim() && { opacity: 0.4 },
          ]}
          disabled={!code.trim()}
          onPress={() => handleManualEntry(code)}
        >
          <Text style={styles.manualEntryText}>Перевірити код</Text>
        </TouchableOpacity>
      </View>

      <ScanResultModal visible={showResultModal}
        onClose={handleCloseModal}
        status={status}
        ticketDetails={ticketDetails}
        isTicketValid={isTicketValid}
        error={error} />

    </View>
  );
};
