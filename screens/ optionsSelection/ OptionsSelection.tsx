import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

import { useCallback, useEffect, useState } from "react";

import { Colors } from "@/constants/Colors";
import { useGetCinemaId } from "@/hooks/useGetCinameId";
import { useActiveDropdown } from "@/screens/ optionsSelection/hooks/useDropdownClose";
import { useGetHalls } from "@/screens/ optionsSelection/hooks/useGetHalls";
import { useGetSessions } from "@/screens/ optionsSelection/hooks/useGetSessions";
import { useStore } from "@/store/store";
import { formatLocalTimeHHmm } from "@/utils/getDate";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetCinemas } from "./hooks/useGetCinamas";

export default function OptionsSelection() {
  const { cinemaId } = useGetCinemaId();
  const router = useRouter();

  const [selectedCinema, setSelectedCinema] = useState<string | null>(cinemaId);
  const [selectedHall, setSelectedHall] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const { data: cinemas = [], isLoading: isCinemaLoading, error: cinemaError } = useGetCinemas();
  const cinemaOptions = cinemas.map((c) => ({ label: c.name, value: c.id }));

  const { data: halls = [], isLoading: isHallLoading, error: hallError } = useGetHalls(selectedCinema);
  const hallOptions = halls.map((h) => ({ label: h.name, value: h.id }));

  const {
    data: sessions = [],
    isLoading: isSessionLoading,
    error: sessionError,
  } = useGetSessions(selectedCinema, selectedHall);
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

  const { isOpen, toggle, close } = useActiveDropdown();

  const isCinemaDropdownOpen = isOpen("cinema");
  const isHallDropdownOpen = isOpen("hall");
  const isSessionDropdownOpen = isOpen("session");


  const setCinemaIdInStore = useStore((s: any) => s.setCinemaId);
  const setHallInStore = useStore((s: any) => s.setHall);
  const setSessionInStore = useStore((s: any) => s.setSession);

  const handleSelectCinema = useCallback(
    (cinemaId: string) => {
      setSelectedCinema(cinemaId);
      close();
      setCinemaIdInStore(cinemas.find((c) => c.id === cinemaId));
      setSelectedHall(null);
      setSelectedSession(null);
      setHallInStore(null);
      setSessionInStore(null);
    }, []
  );

  const handleSelectHall = useCallback(
    (hallId: string) => {
      setSelectedHall(hallId);
      const hall = halls.find((h) => h.id === hallId);
      if (hall) setHallInStore(hall);
      setSelectedSession(null);
      close();
    },
    [halls, selectedCinema]
  );

  const handleSelectSession = useCallback(
    (sessionId: string) => {
      setSelectedSession(sessionId);
      const session = sessions.find((s) => s.id === sessionId);
      if (session) setSessionInStore(session);
      close();
    },
    [sessions]
  );



  // Reset session when hall changes
  useEffect(() => {
    setSelectedSession(null);
  }, [selectedCinema, selectedHall]);


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
  const selectedCinemaLabel =
    cinemaOptions.find((o) => o.value === selectedCinema)?.label ||
    "Оберіть кінотеатр";
  const selectedSessionLabel = selectedSessionOption?.label || "Оберіть сеанс";

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.wrapperContent}>
        <Text style={styles.title}>Вибір параметрів</Text>

        <View>
          <Text style={styles.label}>Вибір кінотеатру</Text>

          {/* Hall selection */}
          <View style={{ marginTop: 8 }}>
            <TouchableOpacity
              onPress={() => toggle("cinema")}
              activeOpacity={0.8}
              style={styles.selector}
            >
              <Text
                style={{
                  color: selectedCinema
                    ? Colors.light.text
                    : Colors.light.textDisabled,
                  fontSize: 16,
                }}
              >
                {selectedCinemaLabel}
              </Text>
            </TouchableOpacity>

            {isCinemaDropdownOpen && (
              <View style={styles.selectorDropdown}>
                <ScrollView style={{ maxHeight: 220 }}>
                  {cinemaOptions.map((o) => (
                    <TouchableOpacity
                      key={o.value}
                      onPress={() => handleSelectCinema(o.value)}
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

          <Text style={styles.label}>Вибір залу</Text>

          {/* Hall selection */}
          <View style={{ marginTop: 8 }}>
            <TouchableOpacity
              disabled={!selectedCinema}
              onPress={
                () => {
                  if (!selectedCinema) return;
                  toggle("hall");
                }
              }
              activeOpacity={0.8}
              style={[styles.selector, { opacity: selectedCinema ? 1 : 0.6 }]}
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
                  if (!selectedHall && !selectedCinema) return;
                  toggle("session");
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
    </SafeAreaView >
  );
}
