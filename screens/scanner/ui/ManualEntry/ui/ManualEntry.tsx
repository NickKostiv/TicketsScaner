import { FC, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export const ManualEntry: FC = () => {
  const [code, setCode] = useState<string>("");

  const handleManualEntry = () => {
    setCode("");
  };
  return (
    <View style={styles.wrapper}>
      <TextInput
        value={code}
        onChangeText={(text: string) => setCode(text)}
        style={styles.codeInput}
        placeholder="Введіть код"
      />

      <TouchableOpacity
        style={styles.manualEntryButton}
        onPress={handleManualEntry}
      >
        <Text style={styles.manualEntryText}>Перевірити код</Text>
      </TouchableOpacity>
    </View>
  );
};
