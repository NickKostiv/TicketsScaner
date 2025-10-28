import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { styles } from "./styles";

import { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { useDropdownClose } from "@/screens/ optionsSelection/hooks/useDropdownClose";
import { Colors } from "@/constants/Colors";
import { useGetCinemaId } from "@/hooks/useGetCinameId";
import { useGetHallsOptions } from "@/screens/ optionsSelection/hooks/useGetHallsOptions";
import { useGetSessionsOptions } from "@/screens/ optionsSelection/hooks/useGetSessionsOptions";

export default function OptionsSelection() {
  const router = useRouter();

  const [selectedHall, setSelectedHall] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const { cinemaId } = useGetCinemaId();
  const { hallOptions } = useGetHallsOptions(cinemaId);
  const { sessionOptions } = useGetSessionsOptions(cinemaId, selectedHall);
  const [isHallDropdownOpen, setIsHallDropdownOpen] = useState(false);
  const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false);

 
  console.log("hallOptions", hallOptions);
  console.log("sessionOptions", sessionOptions);

// Reset session when hall changes
  useEffect(() => {
    setSelectedSession(null);
    setIsSessionDropdownOpen(false);
  }, [selectedHall]);

useDropdownClose(
  isHallDropdownOpen,
  setIsHallDropdownOpen,
  isSessionDropdownOpen,
  setIsSessionDropdownOpen
);

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
  const selectedHallLabel =
    hallOptions.find((o) => o.value === selectedHall)?.label || "Оберіть зал";
  const selectedSessionOption = sessionOptions.find((o) => o.value === selectedSession);
  const selectedSessionLabel = selectedSessionOption?.label || "Оберіть сеанс";

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.wrapperContent}>
        <Text style={styles.title}>Вибір параметрів</Text>

        <View>
          <Text style={styles.label}>Вибір залу</Text>

          {/* Hall selection */}
          <View style={{ marginTop: 8 }}>
            <TouchableOpacity
              onPress={() => setIsHallDropdownOpen((p) => !p)}
              activeOpacity={0.8}
              style={styles.selector}
            >
              <Text
                style={{ color: selectedHall ? Colors.light.text : Colors.light.textDisabled, fontSize: 16 }}
              >
                {selectedHallLabel}
              </Text>
            </TouchableOpacity>

            {isHallDropdownOpen && (
              <View style={styles.selectorDropdown}>
                <ScrollView style={{ maxHeight: 220 }}>
                  {hallOptions.map((o) => (
                    <TouchableOpacity
                      key={o.value}
                      onPress={() => {
                        setSelectedHall(o.value);
                        setIsHallDropdownOpen(false);
                      }}
                      style={{ paddingVertical: 10, paddingHorizontal: 12 }}
                    >
                      <Text style={{ fontSize: 16, color: Colors.light.text }}>
                        {o.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Session selection */}
          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>Вибір сеансу</Text>
            <View style={{ marginTop: 8 }}>
              <TouchableOpacity
                disabled={!selectedHall}
                onPress={() => {
                  if (!selectedHall) return;
                  setIsSessionDropdownOpen((p) => !p);
                }}
                activeOpacity={0.8}
                style={[styles.selector, { opacity: selectedHall ? 1 : 0.6 }]}
              >
                <Text
                  style={{
                    color: selectedSession ? Colors.light.text : Colors.light.textDisabled,
                    fontSize: 16,
                  }}
                >
                  {selectedSessionLabel}
                </Text>
              </TouchableOpacity>

              {isSessionDropdownOpen && (
                <View style={styles.selectorDropdown}>
                  <ScrollView style={{ maxHeight: 220 }}>
                  {sessionOptions.map((o) => (
                      <TouchableOpacity
                        key={o.value}
                        onPress={() => {
                          setSelectedSession(o.value);
                          setIsSessionDropdownOpen(false);
                        }}
                        style={{ paddingVertical: 10, paddingHorizontal: 12 }}
                      >
                      <Text style={{ fontSize: 16, color: Colors.light.text }}>
                        <Text style={{ fontWeight: "700" }}>{o.time}</Text>
                        {` • ${o.title}`}
                      </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <TouchableOpacity
              onPress={goToScanning}
              style={[styles.buttonOption, isDisabled && { opacity: 0.5 }]}
              disabled={isDisabled}
            >
              <Text style={styles.buttonOptionText}>Перейти до сканування</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
