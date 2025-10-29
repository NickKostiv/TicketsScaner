import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { styles } from "./styles";

import { useCallback, useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { useDropdownClose } from "@/screens/ optionsSelection/hooks/useDropdownClose";
import { Colors } from "@/constants/Colors";
import { useGetCinemaId } from "@/hooks/useGetCinameId";
import { useGetSessions } from "@/screens/ optionsSelection/hooks/useGetSessions";
import { useStore } from "@/store/store";
import { useGetHalls } from "@/screens/ optionsSelection/hooks/useGetHalls";
import { formatLocalTimeHHmm } from "@/utils/getDate";

export default function OptionsSelection() {
  const { cinemaId } = useGetCinemaId();
  const router = useRouter();

  const [selectedHall, setSelectedHall] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  
  const { data: halls = [], isLoading: isHallLoading, error: hallError } = useGetHalls(cinemaId);
  const hallOptions = halls.map((h) => ({ label: h.name, value: h.id }));
  const {
    data: sessions = [],
    isLoading: isSessionLoading,
    error: sessionError,
  } = useGetSessions(cinemaId, selectedHall);
  const sessionOptions = sessions.map((s) => {
    const time = formatLocalTimeHHmm(s.start);
    const title = s.movie.title.length > 25 ? s.movie.title.slice(0, 24) + "…" : s.movie.title;
    return {
      label: `${time} • ${title}`,
      value: s.id,
      time,
      title,
    };
  });

  const [isHallDropdownOpen, setIsHallDropdownOpen] = useState(false);
  const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false);
  
  const setHallInStore = useStore((s: any) => s.setHall);
  const setSessionInStore = useStore((s: any) => s.setSession);

  const handleSelectHall = useCallback(
    (hallId: string) => {
      setSelectedHall(hallId);
      const hall = halls.find((h) => h.id === hallId);
      if (hall) setHallInStore(hall);
      setIsHallDropdownOpen(false);
    },
    [halls]
  );

  const handleSelectSession = useCallback(
    (sessionId: string) => {
      setSelectedSession(sessionId);
      const session = sessions.find((s) => s.id === sessionId);
      if (session) setSessionInStore(session);
      setIsSessionDropdownOpen(false);
    },
    [sessions]
  );
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
  const selectedSessionOption = sessionOptions.find(
    (o) => o.value === selectedSession
  );
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
                style={{
                  color: selectedHall
                    ? Colors.light.text
                    : Colors.light.textDisabled,
                  fontSize: 16,
                }}
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
                      onPress={() => handleSelectHall(o.value)}
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
                    color: selectedSession
                      ? Colors.light.text
                      : Colors.light.textDisabled,
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
                        onPress={() => handleSelectSession(o.value)}
                        style={{ paddingVertical: 10, paddingHorizontal: 12 }}
                      >
                        <Text
                          style={{ fontSize: 16, color: Colors.light.text }}
                        >
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
