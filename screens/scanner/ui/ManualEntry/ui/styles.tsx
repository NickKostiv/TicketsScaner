import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 12,
    paddingHorizontal: 30,
    rowGap: 26,
  },

  codeInput: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Colors.light.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
  },
  manualEntryButton: {
    paddingVertical: 12,
    backgroundColor: Colors.light.primary,
    borderRadius: 50,
  },
  manualEntryText: {
    color: Colors.light.white,
    fontWeight: 500,
    fontSize: 16,
    textAlign: "center",
  },
});
