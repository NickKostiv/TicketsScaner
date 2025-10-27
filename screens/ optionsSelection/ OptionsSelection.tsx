import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

import { useEffect, useState } from "react";
import Select from "react-native-picker-select";
import { SafeAreaView } from "react-native-safe-area-context";

const mockHall = [
  { label: "Vip", value: "VIP" },
  { label: "Deluxe", value: "DELUXE" },
  { label: "Standard", value: "STANDARD" },
];

import { getHalls as getHallsApi } from "@/api/services/halls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSessions as getSessionsApi } from "@/api/services/sessions";
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
  const [cinemaId, setCinemaId] = useState<string | null>(null);
  const [hallOptions, setHallOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [sessionOptions, setSessionOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [isLoadingHalls, setIsLoadingHalls] = useState(false);

  useEffect(() => {
    const getCinemaId = async () => {
      try {
        const id = await AsyncStorage.getItem("cinemaId");
        console.log("cinemaId", id);
        setCinemaId(id);
      } catch (e) {
        setCinemaId(null);
      }
    };
    getCinemaId();
  }, []);

  // Load halls when cinemaId available
  useEffect(() => {
    if (!cinemaId) return;
    getHallsApi(cinemaId).then((halls) => {
      setHallOptions(halls.map((hall) => ({ label: hall.name, value: hall.id })));
    });
  }, [cinemaId]);

  // Load sessions only after user selects hall
  useEffect(() => {
    if (!cinemaId || !selectedHall) return;
    getSessionsApi({
      page: 1,
      limit: 10,
      filters: { hallId: selectedHall, cinemaId },
      // sort: [{ orderBy: 'name', order: 'ASC' }],
    }).then((sessions) => {
      setSessionOptions(
        sessions.map((session) => ({ label: session.movie.title, value: session.id }))
      );
    });
  }, [cinemaId, selectedHall]);

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
    <SafeAreaView edges={["top", "bottom"]}>
      <Text>Вибір параметрів</Text>

      <View>
        <Text>Вибір залу</Text>

        <Select
          style={{
            viewContainer: styles.selectHallContainer,
          }}
          placeholder={{ label: "Оберіть зал", value: null }}
          onValueChange={(value) => setSelectedHall(value)}
          value={selectedHall}
          items={hallOptions}
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
