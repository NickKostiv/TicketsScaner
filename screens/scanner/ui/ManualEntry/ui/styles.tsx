import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 12,
    paddingHorizontal: 30,
    rowGap: 26,
  },

  codeInput: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
  },
  manualEntryButton: {
    paddingVertical: 12,
    backgroundColor: "#7EADE5",
    borderRadius: 12,
  },
  manualEntryText: {
    color: "white",
    fontWeight: 500,
    fontSize: 16,
    textAlign: "center",
  },
});
