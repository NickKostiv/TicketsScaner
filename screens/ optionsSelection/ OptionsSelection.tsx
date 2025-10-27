import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

import { useState } from "react";
import Select from "react-native-picker-select";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from '@react-native-picker/picker'

const mockHall = [
  { label: "Vip", value: "VIP" },
  { label: "Deluxe", value: "DELUXE" },
  { label: "Standard", value: "STANDARD" },
];
const mockSession = [
  { label: "Oppenheimer", value: "Oppenheimer" },
  { label: "Dune: Part Two", value: "Dune: Part Two" },
  { label: "Barbie", value: "Barbie" },
  { label: "The Batman", value: "The Batman" },
];

export default function OptionsSelection() {
  const router = useRouter();

  const [selectedHall, setSelectedHall] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const goToScanning = () => {
    router.push({
      pathname: "/scanner",
      params: {
        hall: selectedHall ?? "",
        session: selectedSession ?? "",
      },
    });
  };

  const isDisabled = !selectedHall || !selectedSession;
  return (
    <SafeAreaView edges={["top", "bottom"]} >
     
        <Text >Вибір параметрів</Text>

        <View >
          <Text >Вибір залу</Text>

          <Select
            style={{
              viewContainer: styles.selectHallContainer,
            }}
            placeholder={{ label: "Оберіть зал", value: null }}
            onValueChange={(value) => setSelectedHall(value)}
            value={selectedHall}
            items={mockHall}
            
            onClose={() => {
              console.log("closed");
            }}
            onOpen={() => {
              console.log("opened");
            }}
          />
          {/* <Select
            style={{
              viewContainer: styles.selectHallContainer,
            }}
            placeholder={{ label: "Оберіть зал", value: null }}
            onValueChange={(value) => setSelectedHall(value)}
            value={selectedHall}
            items={mockHall}
          /> */}
        </View>

        {/* <View style={styles.wrapperSessionSelect}>
          <Text style={styles.sessionLabel}>Вибір сеансу</Text>
          <Select
            style={{
              viewContainer: styles.selectSessionContainer,
            }}
            placeholder={{ label: "Оберіть сеанс", value: null }}
            onValueChange={(value) => setSelectedSession(value)}
            value={selectedSession}
            items={mockSession}
          />
        </View>
        <TouchableOpacity
          onPress={goToScanning}
          style={[styles.buttonOption, isDisabled && { opacity: 0.5 }]}
          disabled={isDisabled}
        >
          <Text style={styles.buttonOptionText}>Перейти до сканування</Text>
        </TouchableOpacity> */}

    </SafeAreaView>
  );
}
