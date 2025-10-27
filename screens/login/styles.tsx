import { StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: "#EFF6FF",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  loginContainer: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
    position: "relative",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 20,
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#7EADE5",
    fontSize: 16,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 13,
  },
  loginButton: {
    backgroundColor: "#7EADE5",
    borderRadius: 20,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 2,
    backgroundColor: "#7EADE5",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#888",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    color: "#444",
    fontSize: 16,
  },
  qrCodeContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  qrCodeFrame: {
    width: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scanAuthImage: {
    width: 103,
    height: 103,
    resizeMode: "contain",
  },
});
