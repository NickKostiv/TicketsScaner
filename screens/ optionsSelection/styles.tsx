import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 50,
    paddingTop: 20,
    paddingBottom: 50,
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  wrapperContent: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
  },

  label: {
    fontSize: 16,
    fontWeight: 500,
    marginTop: 15,
    marginLeft: 4,
    marginBottom: 10,
  },
  selector: {
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: Colors.light.white,
  },
  selectorDropdown: {
    marginTop: 3,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 20,
    backgroundColor: Colors.light.white,
    paddingHorizontal: 0,
    paddingVertical: 5,
    maxHeight: 220,
  },

  buttonOption: {
    backgroundColor: Colors.light.primary,
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  buttonOptionText: {
    color: Colors.light.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
