import { TicketStateEnum } from "@/constants/ticketStateEnum";
import { useValidateEntry } from "@/screens/ optionsSelection/hooks/useValidateEntry";
import { Ticket } from "@/types/ticket/ticket";
import { FC, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScanResultModal } from "../../ScanResultModal/ui/ScanResultModal";
import { styles } from "./styles";

export const ManualEntry: FC = () => {
  const [code, setCode] = useState<string>("");
  const [showResultModal, setShowResultModal] = useState(false);
  const [scanned, setScanned] = useState(false);
  const { mutate, data, isPending, isSuccess, isError, error } = useValidateEntry();

  const handleCloseModal = () => {
    setShowResultModal(false);
    setScanned(false);
  };

  const isTicketValid = (ticket: Ticket): boolean => {
    if (ticket?.state === TicketStateEnum.SOLD && ticket.scanTimes === 1) {
      return true;
    }
    return false;
  }

  const handleManualEntry = (code: string) => {
    if (scanned) return;

    const barcode = Number(code);
    setScanned(true);
    setShowResultModal(true)

    mutate(barcode);

  };

  return (
    <>
      <View style={styles.wrapper}>
        <TextInput
          value={code}
          onChangeText={(text: string) => setCode(text)}
          style={styles.codeInput}
          placeholder="Введіть код"
        />

        <TouchableOpacity
          style={styles.manualEntryButton}
          onPress={() => handleManualEntry(code)}
        >
          <Text style={styles.manualEntryText}>Перевірити код</Text>
        </TouchableOpacity>
      </View>

      <ScanResultModal data={data} showResultModal={showResultModal} handleCloseModal={handleCloseModal} isTicketValid={isTicketValid} isSuccess={isSuccess} isPending={isPending} isError={isError} error={error} />
    </>
  );
};
