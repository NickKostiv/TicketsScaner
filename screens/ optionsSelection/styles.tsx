import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 50,
    paddingTop: 20,
    paddingBottom: 50,
    // flex: 1,
    backgroundColor: Colors.light.background, 
  },
  title: {
    fontSize: 26,
    textAlign: "center",
  },

  wrapperHallSelect: {
    marginTop: 40,
  },

  hallLabel: {
    fontSize: 16,
    fontWeight: 500,
    marginLeft: 4,
    marginBottom: 10,
  },
  selectHallContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    marginTop: 8,
  },

  wrapperSessionSelect: {
    marginTop: 30,
  },
  sessionLabel: {
    fontSize: 16,
    fontWeight: 500,
    marginLeft: 4,
  },
  selectSessionContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    marginTop: 6,
  },
  buttonOption: {
    backgroundColor: "#7EADE5",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  buttonOptionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
