import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

import { useState } from "react";
import Select from "react-native-picker-select";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.wrapper}  >
    {/* <View > */}
      <Text style={styles.title}>Вибір параметрів</Text>

      <View style={styles.wrapperHallSelect}>
        <Text style={styles.hallLabel}>Вибір залу</Text>
        <Select
          style={{
            viewContainer: styles.selectHallContainer,
          }}
          placeholder={{ label: "Оберіть зал", value: null }}
          onValueChange={(value) => setSelectedHall(value)}
          value={selectedHall}
          items={mockHall}
        />
      </View>

      <View style={styles.wrapperSessionSelect}>
        <Text style={styles.sessionLabel}>Вибір сеансу</Text>
        <Select
          style={{
            inputIOS: {
              // Стиль для iOS
              fontSize: 16,
              paddingVertical: 12,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 4,
              color: 'black',
              paddingRight: 30, // щоб текст не перекривав стрілку
            },
            inputAndroid: {
              // Стиль для Android
              fontSize: 16,
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderWidth: 0.5,
              borderColor: 'purple',
              borderRadius: 8,
              color: 'black',
              paddingRight: 30,
            },
            placeholder: {
              color: 'gray',
            },
            iconContainer: {
              top: 10,
              right: 12,
            },
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
      </TouchableOpacity>
    {/* </View> */}
    </SafeAreaView>
  );
}
