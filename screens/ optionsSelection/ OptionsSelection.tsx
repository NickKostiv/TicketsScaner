import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function OptionsSelection() {
  const router = useRouter();
  const isDisabled = false;
  return (
    <View
      style={{
        paddingHorizontal: 50,
        paddingTop: 20,
        paddingBottom: 50,
        flex: 1,
      }}
    >
      <Text style={{ fontSize: 26, textAlign: "center" }}>
        Вибір параметрів
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/scanner")}
        style={[
          {
            backgroundColor: "#7EADE5",
            borderRadius: 20,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            marginTop: "auto",
          },
          isDisabled && { opacity: 0.7 },
        ]}
        disabled={isDisabled}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Перейти до сканування
        </Text>
      </TouchableOpacity>
    </View>
  );
}
