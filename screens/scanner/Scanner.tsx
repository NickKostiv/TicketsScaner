import { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import { ManualEntry } from "./ui/ManualEntry/ui/ManualEntry";
import { TicketScanner } from "./ui/TicketScanner/ui/TicketScanner";
import { useStore } from "@/store/store";
import { formatLocalTimeHHmm } from "@/utils/getDate";

export default function Scanner() {
  const [isManualEntry, setIsManualEntry] = useState(false);

  const toggleManualEntry = () => {
    setIsManualEntry((prev) => !prev);
  };

  const hallFromStore = useStore((s: any) => s.hall);
  const sessionFromStore = useStore((s: any) => s.session);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {hallFromStore && sessionFromStore && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 14,
              rowGap: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 8,
              }}
            >
              <Text style={styles.infoTitle}>Кінотеатр:</Text>
              <Text style={styles.infoText}>{"Cinema"}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 8,
              }}
            >
              <Text style={styles.infoTitle}>Зал:</Text>
              <Text style={styles.infoText}>{hallFromStore?.name}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 8,
              }}
            >
              <Text style={styles.infoTitle}>Сеанс:</Text>
              <Text style={styles.infoText}>
                {sessionFromStore
                  ? `${formatLocalTimeHHmm(sessionFromStore.start)} • ${
                      sessionFromStore.movie.title
                    }`
                  : ""}
              </Text>
            </View>
          </View>
        ) }

        {isManualEntry ? <ManualEntry /> : <TicketScanner />}

        {/* TODO review this */}
        {/* <View style={styles.info}>
          <Text style={styles.infoText}>Куплено квитків: 100</Text>
          <Text style={styles.infoText}>Відскановано квитків: 100</Text>
        </View> */}

        <View style={{ paddingHorizontal: 40, marginVertical: 30}}>
          <TouchableOpacity
            style={styles.manualEntryButton}
            onPress={toggleManualEntry}
          >
            <Text style={styles.manualEntryText}>
              {isManualEntry
                ? "Повернутися до сканування"
                : "Ввести код вручну"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
