import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },

  info: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  infoTitle: {
    fontSize: 20,
  },
  infoText: {
    fontSize: 18,
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
