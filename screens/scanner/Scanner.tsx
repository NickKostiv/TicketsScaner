import { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import { useLocalSearchParams } from "expo-router";
import { styles } from "./styles";
import { ManualEntry } from "./ui/ManualEntry/ui/ManualEntry";
import { TicketScanner } from "./ui/TicketScanner/ui/TicketScanner";
import { useGetCinemaId } from "@/hooks/useGetCinameId";
import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store/store";

export default function Scanner() {
  const [isManualEntry, setIsManualEntry] = useState(false);

  const toggleManualEntry = () => {
    setIsManualEntry((prev) => !prev);
  };

  const hallFromStore = useStore((s: any) => s.hall);

  
  console.log('hallFromStore', hallFromStore);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 14,
            rowGap: 8,
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", columnGap: 8 }}
          >
            <Text style={{ fontSize: 20 }}>Зал:</Text>
            <Text style={{ fontSize: 18 }}>{hallFromStore?.name}</Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", columnGap: 8 }}
          >
            <Text style={{ fontSize: 20 }}>Сеанс:</Text>
            <Text style={{ fontSize: 18 }}>{"session"}</Text>
          </View>
        </View>

        {isManualEntry ? <ManualEntry /> : <TicketScanner />}

        <View style={styles.info}>
          <Text style={styles.infoText}>Куплено квитків: 100</Text>
          <Text style={styles.infoText}>Відскановано квитків: 100</Text>
        </View>

        <View style={{ paddingHorizontal: 40, marginVertical: 30 }}>
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
