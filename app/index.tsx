import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import GoogleLogo from "../assets/images/GoogleLogo.svg";
import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Авторизуйтесь для входу</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="E-MAIL"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="ВВЕДІТЬ ПАРОЛЬ"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>УВІЙТИ</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity style={styles.googleButton}>
            <GoogleLogo width={24} height={24} style={styles.googleIcon} />
            <Text style={styles.googleButtonText}>Google</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.qrCodeContainer}>
          <View style={styles.qrCodeFrame}>
            <Image
              source={require("../assets/images/ScanAuthImg.png")}
              style={styles.scanAuthImage}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
