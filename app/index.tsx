import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
  Alert,
} from "react-native";
import { BarCodeScannerResult } from "expo-barcode-scanner";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert("Помилка", "Будь ласка, заповніть всі поля");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Помилка", "Будь ласка, введіть коректний email");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Помилка", "Пароль має містити не менше 6 символів");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      // Fake API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Always succeed for now
      // Navigate to scanner screen
      router.push("/scanner");
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося увійти. Спробуйте ще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBarCodeScanned = (scanResult: BarCodeScannerResult) => {
    // Function body...
  };

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

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}>
            <Text style={styles.loginButtonText}>
              {isLoading ? "ЗАВАНТАЖЕННЯ..." : "УВІЙТИ"}
            </Text>
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
          <TouchableOpacity
            style={styles.qrCodeFrame}
            onPress={() => router.push("/scanner")}>
            <Image
              source={require("../assets/images/ScanAuthImg.png")}
              style={styles.scanAuthImage}
            />
          </TouchableOpacity>
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
